import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { backendConfig } from 'config';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import {
  JWTPayload,
  JWTToken,
  LoginRequest,
  RegisterUserResponse,
  RegisterUserRetailRequest,
  RegisterUserSMEsRequest,
} from 'types';
import { UserRepository } from '../repositories/userRepo';
import {
  DatabaseError,
  EmailHasBeenSent,
  EmailNotSentError,
  InvalidRequestError,
  PermissionError,
} from 'src/common/error';
import { User, VerificationEmail } from 'database';
import { VerificationEmailRepository } from 'src/repositories/verificationEmailRepo';
import { SMEsRepository } from 'src/repositories/smesRepo';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class AuthService {
  private readonly hashRound: number = backendConfig.bcrypt.hashRound;
  private readonly jwtAccessTokenOptions = {
    secret: backendConfig.jwt.accessToken.secret,
    expiresIn: backendConfig.jwt.accessToken.expire,
  };
  private readonly jwtRefreshTokenOptions = {
    secret: backendConfig.jwt.refreshToken.secret,
    expiresIn: backendConfig.jwt.refreshToken.expire,
  };
  private readonly jwtEmailTokenOptions = {
    secret: backendConfig.jwt.emailToken.secret,
    expiresIn: backendConfig.jwt.emailToken.expire,
  };

  constructor(
    private jwtService: JwtService,
    private readonly userRepo: UserRepository,
    private readonly verificationEmailRepo: VerificationEmailRepository,
    private readonly smesRepo: SMEsRepository,
  ) {}

  async registerSMEs(
    userData: RegisterUserSMEsRequest,
  ): Promise<RegisterUserResponse> {
    const { password, ...data } = userData;
    const hashedPassword = await bcrypt.hash(password, this.hashRound);
    const repoResult = await this.userRepo.registerUserWithoutEmail({
      password: hashedPassword,
      ...data,
    });
    if (!repoResult) {
      throw new DatabaseError('User cannot be created due to database error.');
    } else {
      return {
        email: data.email,
        id: repoResult.id,
        name: repoResult.name,
        phone: repoResult.phone,
        role: repoResult.role,
      };
    }
  }

  async registerRetail(
    userData: RegisterUserRetailRequest,
  ): Promise<RegisterUserResponse> {
    const { password, ...data } = userData;
    const hashedPassword = await bcrypt.hash(password, this.hashRound);
    const repoResult = await this.userRepo.registerUserWithoutEmail({
      password: hashedPassword,
      ...data,
    });
    if (!repoResult) {
      throw new DatabaseError('User cannot be created due to database error.');
    } else {
      return {
        email: data.email,
        id: repoResult.id,
        name: repoResult.name,
        phone: repoResult.phone,
        role: repoResult.role,
      };
    }
  }

  async logIn(userData: LoginRequest): Promise<JWTToken> {
    const [user] = await this.userRepo.find({
      email: userData.email,
      emailVerified: true,
    });
    if (!user) {
      throw new InvalidRequestError('Email must be registered and verified.');
    }
    const validUser = await bcrypt.compare(userData.password, user.password);
    if (!validUser) {
      throw new PermissionError('Incorrect password.');
    }
    return await this.generateToken({ userId: user.id, role: user.role });
  }

  signAccessToken(payload: JWTPayload): string {
    return this.jwtService.sign(payload, this.jwtAccessTokenOptions);
  }

  async signAccessTokenAsync(payload: JWTPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, this.jwtAccessTokenOptions);
  }

  signRefreshToken(payload: JWTPayload): string {
    return this.jwtService.sign(payload, this.jwtRefreshTokenOptions);
  }

  async signRefreshTokenAsync(payload: JWTPayload): Promise<string> {
    return await this.jwtService.signAsync(
      payload,
      this.jwtRefreshTokenOptions,
    );
  }

  async generateToken(jwtPayload: JWTPayload): Promise<JWTToken> {
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessTokenAsync(jwtPayload),
      this.signRefreshTokenAsync(jwtPayload),
    ]);
    // const accessToken = this.signAccessTokenAsync(jwtPayload);
    // const refreshToken = this.signRefreshTokenAsync(jwtPayload);
    if (backendConfig.node_env === 'development') {
      await this.userRepo.updateUser(jwtPayload.userId, { token: accessToken });
    }
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async profile(id: number) {
    const [{ password, token, ...userData }, smesData] = await Promise.all([
      this.userRepo.findUniqueUser({ id: id }),
      this.smesRepo.findByUserId(id),
    ]);
    if (smesData) {
      return {
        ...userData,
        ...smesData,
      };
    } else {
      return userData;
    }
  }

  async creatEmailToken(
    email: string,
    userId: number,
  ): Promise<VerificationEmail> {
    const emailVerification =
      await this.verificationEmailRepo.getVerificationEmail(userId);
    let decodedEmailToken;
    if (emailVerification) {
      decodedEmailToken = this.jwtService.decode(emailVerification.token);
    }
    // check if sent within 15 min
    if (
      emailVerification &&
      new Date().getTime() / 1000 - decodedEmailToken.iat < 15 * 60
    ) {
      throw new EmailHasBeenSent('Verification email has been sent recently.');
    } else {
      return await this.verificationEmailRepo.upsert(
        { userId: userId },
        {
          email: email,
          token: await this.jwtService.signAsync(
            { userId: userId, email: email },
            this.jwtEmailTokenOptions,
          ),
        },
      );
    }
  }

  async sendVerificationEmail(email: string, userId: number): Promise<boolean> {
    // also used for resend verification email
    // check if already exists user with that email AND still not verified
    const verifiedEmail = await this.findUserWithVerifiedEmail(email);
    if (verifiedEmail) {
      throw new InvalidRequestError(
        'Email not found or has already been verified.',
      );
    } else {
      const newEmailToken = await this.creatEmailToken(email, userId);
      let verificationLink;
      if (backendConfig.node_env === 'development') {
        if (
          backendConfig.url === 'http://localhost' ||
          backendConfig.url === 'http://127.0.0.1'
        ) {
          verificationLink = `${backendConfig.url}:${backendConfig.port}/auth/email/verify/${newEmailToken.token}`;
        } else {
          verificationLink = `https://${backendConfig.url}/auth/email/verify/${newEmailToken.token}`;
        }
      } else {
        verificationLink = `https://${backendConfig.url}/auth/email/verify/${newEmailToken.token}`;
      }
      const transporter = nodemailer.createTransport({
        ...backendConfig.email,
      });
      const mailOptions = {
        from: '"SolarCC Company" <' + backendConfig.email.auth.user + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Verify Email for SolarCC',
        html: `Hi! <br><br> Thank you for register in our service. Your name has been registered as ${sanitizeHtml(
          (await this.profile(userId)).name,
        )}.<br><br>Click here to activate your account<br>${verificationLink}`,
      };
      try {
        const emailSent = await transporter.sendMail(mailOptions);
        return emailSent ? true : false;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }

  async verifyEmail(token: string): Promise<{
    email: string;
    userId: number;
  }> {
    const verificationEmail =
      await this.verificationEmailRepo.getVerificationEmailFromToken(token);
    // check if email has already been verified
    if (!verificationEmail) {
      throw new InvalidRequestError(
        'Email cannot be activated due to invalid token.',
      );
    }
    const existedEmailUser = await this.findUserWithVerifiedEmail(
      verificationEmail.email,
    );
    if (existedEmailUser) {
      throw new PermissionError('Email has already been verified.');
    }
    const decodedToken = this.jwtService.decode(verificationEmail.token);
    const IsValidTime = decodedToken['exp'] > Date.now() / 1000;
    if (IsValidTime) {
      // only update email to user after verification
      await this.userRepo.updateUser(verificationEmail.userId, {
        email: verificationEmail.email,
        emailVerified: true,
      });
      return verificationEmail;
    } else {
      throw new PermissionError(
        'Verification link already expired. Please try resending email option',
      );
    }
  }

  async resendVerificationEmail(email: string, userId: number) {
    const userResult = await this.userRepo.findUniqueUser({ id: userId });
    if (!userResult) {
      throw new InvalidRequestError('Invalid userId.');
    }
    return await this.sendVerificationEmail(email, userId);
  }

  // async findAndDeleteUnusedUserByEmail(email: string): Promise<User>{
  //   const user = await this.userRepo.findUniqueUser({email: email})
  //   if (user && !user.emailVerified){
  //     const deleteResult = await this.userRepo.deleteUser(user.id)
  //     return deleteResult
  //   }
  // }

  async findUserWithVerifiedEmail(email: string): Promise<User> {
    return await this.userRepo.findFirst({ email: email, emailVerified: true });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepo.findUniqueUser({ email: email });

    if (user) {
      const userResetPasswordToken =
        await this.userRepo.getUserResetPasswordTokenFromEmail(email);
      if (
        userResetPasswordToken &&
        userResetPasswordToken.expiredAt > new Date()
      ) {
        throw new EmailHasBeenSent(
          `Reset Password email has been sent recently. Please wait for ${backendConfig.resetPasswordTokenExpireMinutes} minutes before trying again`,
        );
      }

      const resetPasswordToken = crypto.randomBytes(64).toString('hex');

      await this.userRepo.createOrUpdateUserResetPasswordToken(user.id, {
        token: resetPasswordToken,
        expiredAt: new Date(
          Date.now() +
            1000 * 60 * backendConfig.resetPasswordTokenExpireMinutes,
        ),
      });

      const verificationLink = `${
        backendConfig.frontend.url
      }/auth/reset-password/?email=${encodeURIComponent(
        email,
      )}&token=${encodeURIComponent(resetPasswordToken)}`;
      const transporter = nodemailer.createTransport({
        ...backendConfig.email,
      });
      const mailOptions = {
        from: '"SolarCC Company" <' + backendConfig.email.auth.user + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Reset Password for SolarCC',
        html: `Hi! <br><br> This is your link for your password reset. You should ignore this email if you doesn't request a password reset.<br><br>Click here to reset your password<br>${verificationLink}`,
      };
      try {
        const emailSent = await transporter.sendMail(mailOptions);

        if (!emailSent) {
          throw new EmailNotSentError('Reset Password Email not sent.');
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }

  async resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<boolean> {
    const userResetPasswordToken =
      await this.userRepo.getUserResetPasswordTokenFromEmail(email);

    if (
      userResetPasswordToken === null ||
      userResetPasswordToken.expiredAt < new Date() ||
      token !== userResetPasswordToken.token
    ) {
      throw new InvalidRequestError(
        'Email Not Found, Invalid Token or Token expired.',
      );
    }
    await this.userRepo.deleteUserResetPasswordToken(
      userResetPasswordToken.userId,
    );
    await this.userRepo.changeUserPassword(
      email,
      await bcrypt.hash(newPassword, this.hashRound),
    );
    return true;
  }
}

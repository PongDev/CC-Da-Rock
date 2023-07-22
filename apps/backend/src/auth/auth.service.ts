import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { backendConfig } from 'config';
import * as bcrypt from 'bcrypt';
import {
  JWTPayload,
  JWTToken,
  LoginRequest,
  RegisterUserResponse,
  RegisterUserRetailRequest,
} from 'types';
import { UsersRepository } from '../repositories/userRepo';
import { InvalidRequestError, PermissionError } from 'src/common/error';
import { User } from 'database';

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

  constructor(
    private jwtService: JwtService,
    private readonly usersRepo: UsersRepository,
  ) {}

  async registerSMEs(
    userData: RegisterUserRetailRequest,
  ): Promise<RegisterUserResponse> {
    const { password, ...data } = userData;
    const hashedPassword = await bcrypt.hash(password, this.hashRound);
    const repoResult = await this.usersRepo.createUser({
      password: hashedPassword,
      ...data,
    });
    return {
      email: repoResult.email,
      id: repoResult.id,
      name: repoResult.name,
      phone: repoResult.phone,
      role: repoResult.role,
    };
  }

  async registerRetail(
    userData: RegisterUserRetailRequest,
  ): Promise<RegisterUserResponse> {
    const { password, ...data } = userData;
    const hashedPassword = await bcrypt.hash(password, this.hashRound);
    return await this.usersRepo.createUser({
      password: hashedPassword,
      ...data,
    });
  }

  async logIn(userData: LoginRequest): Promise<JWTToken> {
    const user = await this.usersRepo.getUserByEmail(userData.email);
    if (!user) {
      throw new InvalidRequestError('Incorrect email. Please try again.');
    }
    const validUser = await bcrypt.compare(userData.password, user.password);
    if (!validUser) {
      throw new PermissionError('Incorrect password.');
    }
    return await this.generateToken({ userID: user.id, role: user.role });
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
      await this.usersRepo.updateToken(jwtPayload.userID, accessToken);
    }
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async profile(userId: number): Promise<User> {
    return await this.usersRepo.findUniqueUser({ userId: userId });
  }

  // async emailVerification(email){
  //   var sent = await this.sendEmailVerification(email);
  //     if(sent){
  //       return new
  //     } else {
  //       return new
  //     }
  // }
}

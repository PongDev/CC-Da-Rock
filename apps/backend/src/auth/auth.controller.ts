import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Redirect,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ForgotPasswordRequestDTO,
  JWTPayload,
  JWTToken,
  LoginRequest,
  RegisterUserResponse,
  RegisterUserRetailRequest,
  RegisterUserSMEsRequest,
  ResendEmailRequestDto,
  ResendEmailResponseDto,
  ResetPasswordRequestDTO,
  VerifyEmailResponseDto,
} from 'types';
import { User } from './user.decorator';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import { JwtAuthGuard } from './jwt-auth.guard';
import { EmailNotSentError } from 'src/common/error';
import { backendConfig as config } from 'config';

@ApiTags('auth')
@Controller('auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Data already exists in another user.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check your input again.',
  })
  @Post('register/retail')
  @HttpCode(HttpStatus.CREATED)
  async registerRetail(
    @Body() userData: RegisterUserRetailRequest,
  ): Promise<RegisterUserResponse> {
    const newUser = await this.authService.registerRetail(userData);
    const emailSent = await this.authService.sendVerificationEmail(
      userData.email,
      newUser.id,
    );
    if (!emailSent) {
      throw new EmailNotSentError('Email not sent.');
    }
    return newUser;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Data already exists in another user.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check your input again.',
  })
  @Post('register/SMEs')
  @HttpCode(HttpStatus.CREATED)
  async registerSMEs(
    @Body() userData: RegisterUserSMEsRequest,
  ): Promise<RegisterUserResponse> {
    const newUser = await this.authService.registerSMEs(userData);
    const emailSent = await this.authService.sendVerificationEmail(
      newUser.email,
      newUser.id,
    );
    if (!emailSent) {
      throw new EmailNotSentError('Email not sent.');
    }
    return newUser;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has successfully logged in.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check your input again.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() userData: LoginRequest): Promise<JWTToken> {
    return await this.authService.logIn(userData);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token has been refreshed.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiBearerAuth()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@User() user: JWTPayload): Promise<JWTToken> {
    return await this.authService.generateToken({
      userId: user.userId,
      role: user.role,
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get profile successfully.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiBearerAuth()
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async profile(@User() user: JWTPayload) {
    return await this.authService.profile(user.userId);
  }

  @ApiExtraModels(VerifyEmailResponseDto)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully verify email.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Problem with the request. Invalid token is provided.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Link has expired or email has already been verified.',
  })
  @Get('email/verify/:token')
  @HttpCode(HttpStatus.OK)
  @Redirect(`${config.frontend.url}/auth/success`)
  async verify(
    @Param('token') token: string,
  ): Promise<VerifyEmailResponseDto | { url: string }> {
    const verifiedUserId = await this.authService.verifyEmail(token);
    if (verifiedUserId) {
      return {
        url: `${config.frontend.url}/auth/success`,
      };
    } else {
      return {
        success: true,
        message: 'Successfully verify email.',
        email: verifiedUserId.email,
      };
    }
  }

  @ApiExtraModels(ResendEmailResponseDto)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully resend email.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Problem with the request.',
  })
  @Get('email/resend')
  @HttpCode(HttpStatus.OK)
  async resendEmailVerification(
    @Body() data: ResendEmailRequestDto,
  ): Promise<ResendEmailResponseDto> {
    const isEmailSent = await this.authService.resendVerificationEmail(
      data.email,
      data.id,
    );
    if (isEmailSent) {
      return {
        success: true,
        message: 'Email has been sent.',
      };
    } else {
      throw new EmailNotSentError('Email not sent.');
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Verification Email has been sent if the email exists in our system.',
  })
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() data: ForgotPasswordRequestDTO): Promise<void> {
    await this.authService.forgotPassword(data.email);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Reset User's Password.",
  })
  @Post('reset-password')
  @HttpCode(HttpStatus.CREATED)
  async resetPassword(@Body() data: ResetPasswordRequestDTO): Promise<void> {
    await this.authService.resetPassword(
      data.email,
      data.token,
      data.newPassword,
    );
  }
}

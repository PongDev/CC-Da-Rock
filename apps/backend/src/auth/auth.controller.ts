import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  JWTPayload,
  JWTToken,
  LoginRequest,
  RegisterUserResponse,
  RegisterUserRetailRequest,
  RegisterUserSMEsRequest,
  resendEmailDto,
} from 'types';
import { User } from './user.decorator';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import { JwtAuthGuard } from './jwt-auth.guard';
import * as database from 'database';
import { EmailNotSentError } from 'src/common/error';

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
    return await this.authService.generateToken({ userID: user.userId });
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
    return await this.authService.profile(user.userID);
  }

  @Get('email/verify/:token')
  @HttpCode(HttpStatus.OK)
  async verify(@Param('token') token: string): Promise<JWTToken> {
    const verifiedUserId = await this.authService.verifyEmail(token);
    return await this.authService.generateToken({ userID: verifiedUserId });
  }

  @Get('email/resend')
  async resendEmailVerification(@Body() data: resendEmailDto): Promise<string> {
    const isEmailSent = await this.authService.sendVerificationEmail(
      data.email,
      data.id,
    );
    if (isEmailSent) {
      return 'Email has been sent.';
    } else {
      throw new EmailNotSentError('Email not sent.');
    }
  }
}

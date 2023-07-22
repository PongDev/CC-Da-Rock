import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
} from 'types';
import { User } from './user.decorator';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import { JwtAuthGuard } from './jwt-auth.guard';
import * as database from 'database';

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
    return await this.authService.registerRetail(userData);
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
    @Body() userData: RegisterUserRetailRequest,
  ): Promise<RegisterUserResponse> {
    return await this.authService.registerSMEs(userData);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has successfully logged in.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Please check your input again.',
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
      userID: user.userId,
      role: user.role,
    });
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
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async profile(@User() user: JWTPayload): Promise<database.User> {
    return await this.authService.profile(user.userID);
  }
}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshTokenStrategy } from './jwt-refresh.strategy';
import { UsersRepository } from 'src/repositories/userRepo';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    UsersRepository,
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

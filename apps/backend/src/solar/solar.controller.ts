import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import {
  JWTPayload,
  SolarBurnResponseDTO,
  SolarGenerateRequestDTO,
  SolarGenerateResponseDTO,
} from 'types';
import { SolarService } from './solar.service';
import { RoleType } from 'database';
import { PermissionError } from 'src/common/error';

@Controller('solar')
@ApiBearerAuth()
@UseFilters(AllExceptionsFilter)
@ApiTags('solar')
export class SolarController {
  constructor(private solarService: SolarService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Solar Serials Created',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Post('generate')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async generateSolar(
    @Body() req: SolarGenerateRequestDTO,
    @User() user: JWTPayload,
  ): Promise<SolarGenerateResponseDTO> {
    if (user.role === RoleType.ADMIN) {
      return await this.solarService.generateSolar(req.ccSerial);
    }
    throw new PermissionError('Only admin can generate solar serials');
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Carbon Credits Burned',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Post('burn')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async burnSolar(@User() user: JWTPayload): Promise<SolarBurnResponseDTO> {
    if (user.role === RoleType.ADMIN) {
      return await this.solarService.burnSolar();
    }
    throw new PermissionError('Only admin can burn carbon credits');
  }
}

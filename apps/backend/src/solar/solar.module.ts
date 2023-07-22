import { Module } from '@nestjs/common';
import { SolarController } from './solar.controller';
import { SolarService } from './solar.service';
import { SolarsRepository } from 'src/repositories/solarRepo';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SolarController],
  providers: [SolarService, SolarsRepository, PrismaService],
})
export class SolarModule {}

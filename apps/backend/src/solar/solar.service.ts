import { Injectable } from '@nestjs/common';
import { BusinessLogicError } from 'src/common/error';
import { SolarsRepository } from 'src/repositories/solarRepo';
import {
  JWTPayload,
  SolarBurnResponseDTO,
  SolarGenerateResponseDTO,
} from 'types';

@Injectable()
export class SolarService {
  constructor(private readonly solarRepo: SolarsRepository) {}

  async generateSolar(ccSerial: string): Promise<SolarGenerateResponseDTO> {
    return {
      solarSerials: await this.solarRepo.generateSolar(ccSerial),
    };
  }

  async burnSolar(): Promise<SolarBurnResponseDTO> {
    const result = await this.solarRepo.burnSolar();
    if (result === null) {
      throw new BusinessLogicError('Invalid Database Information');
    }
    return {
      ccSerials: result,
    };
  }
}

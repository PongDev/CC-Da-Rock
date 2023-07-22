import { Test, TestingModule } from '@nestjs/testing';
import { SolarService } from './solar.service';

describe('SolarService', () => {
  let service: SolarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolarService],
    }).compile();

    service = module.get<SolarService>(SolarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SolarController } from './solar.controller';

describe('SolarController', () => {
  let controller: SolarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolarController],
    }).compile();

    controller = module.get<SolarController>(SolarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

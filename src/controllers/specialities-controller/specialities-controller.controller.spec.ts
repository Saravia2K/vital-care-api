import { Test, TestingModule } from '@nestjs/testing';
import { SpecialitiesControllerController } from './specialities-controller.controller';

describe('SpecialitiesControllerController', () => {
  let controller: SpecialitiesControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialitiesControllerController],
    }).compile();

    controller = module.get<SpecialitiesControllerController>(SpecialitiesControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

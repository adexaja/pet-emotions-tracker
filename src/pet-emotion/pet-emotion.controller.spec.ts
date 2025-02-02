import { Test, TestingModule } from '@nestjs/testing';
import { PetEmotionController } from './pet-emotion.controller';
import { PetEmotionService } from './pet-emotion.service';

describe('PetEmotionController', () => {
  let controller: PetEmotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetEmotionController],
      providers: [PetEmotionService],
    }).compile();

    controller = module.get<PetEmotionController>(PetEmotionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

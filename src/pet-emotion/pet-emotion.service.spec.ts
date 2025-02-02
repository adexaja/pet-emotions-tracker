import { Test, TestingModule } from '@nestjs/testing';
import { PetEmotionService } from './pet-emotion.service';

describe('PetEmotionService', () => {
  let service: PetEmotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetEmotionService],
    }).compile();

    service = module.get<PetEmotionService>(PetEmotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

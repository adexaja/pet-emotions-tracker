import { Module } from '@nestjs/common';
import { PetEmotionService } from './pet-emotion.service';
import { PetEmotionController } from './pet-emotion.controller';

@Module({
  controllers: [PetEmotionController],
  providers: [PetEmotionService],
})
export class PetEmotionModule {}

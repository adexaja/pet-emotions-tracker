import { Module } from '@nestjs/common';
import { PetEmotionService } from './pet-emotion.service';
import { PetEmotionController } from './pet-emotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEmotion } from './entities/pet-emotion.entity';

@Module({
  controllers: [PetEmotionController],
  providers: [PetEmotionService],
  imports: [TypeOrmModule.forFeature([PetEmotion])],
  exports: [TypeOrmModule],
})
export class PetEmotionModule {}

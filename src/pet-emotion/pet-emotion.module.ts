import { Module } from '@nestjs/common';
import { PetEmotionService } from './pet-emotion.service';
import { PetEmotionController } from './pet-emotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEmotion } from './entities/pet-emotion.entity';
import DataSource from '../config/typeorm.config';

@Module({
  controllers: [PetEmotionController],
  providers: [PetEmotionService],
  imports: [TypeOrmModule.forFeature([PetEmotion], DataSource)],
  exports: [TypeOrmModule],
})
export class PetEmotionModule {}

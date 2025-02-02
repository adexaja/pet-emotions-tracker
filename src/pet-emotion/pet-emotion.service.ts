import { Injectable } from '@nestjs/common';
import { CreatePetEmotionDto } from './dto/create-pet-emotion.dto';
import { UpdatePetEmotionDto } from './dto/update-pet-emotion.dto';

@Injectable()
export class PetEmotionService {
  create(createPetEmotionDto: CreatePetEmotionDto) {
    return 'This action adds a new petEmotion';
  }

  findAll() {
    return `This action returns all petEmotion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} petEmotion`;
  }

  update(id: number, updatePetEmotionDto: UpdatePetEmotionDto) {
    return `This action updates a #${id} petEmotion`;
  }

  remove(id: number) {
    return `This action removes a #${id} petEmotion`;
  }
}

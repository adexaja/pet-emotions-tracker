import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetEmotion } from './entities/pet-emotion.entity';
import { CreatePetEmotionDto } from './dto/create-pet-emotion.dto';

@Injectable()
export class PetEmotionService {
  constructor(
    @InjectRepository(PetEmotion)
    private emotionsRepository: Repository<PetEmotion>,
  ) {}

  async create(
    createPetPetEmotionDto: CreatePetEmotionDto,
  ): Promise<PetEmotion> {
    const newPetEmotion = this.emotionsRepository.create(
      createPetPetEmotionDto,
    );
    return this.emotionsRepository.save(newPetEmotion);
  }

  async findByPetId(petId: string): Promise<PetEmotion[]> {
    const emotions = await this.emotionsRepository.find({
      where: { pet: { id: petId } },
      relations: ['pet'],
    });

    if (!emotions || emotions.length === 0) {
      return [];
    }

    return emotions;
  }
}

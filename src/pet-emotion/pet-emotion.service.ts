import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetEmotion } from './entities/pet-emotion.entity';
import { CreatePetEmotionDto } from './dto/create-pet-emotion.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdatePetEmotionDto } from './dto/update-pet-emotion-dto';

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

  async findAll(): Promise<PetEmotion[]> {
    const emotions = await this.emotionsRepository.find({
      relations: ['pet'],
    });

    if (!emotions || emotions.length === 0) {
      return [];
    }

    return emotions;
  }

  async findOne(id: string): Promise<PetEmotion> {
    const pet = await this.emotionsRepository.findOne({
      where: { id },
      relations: ['pet'],
    });
    if (!pet) {
      throw new NotFoundException(`Pet Emotion with ID ${id} not found`);
    }
    return pet;
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.emotionsRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Pet Emotion with ID ${id} not found`);
    }
  }
  async update(
    id: string,
    updatePetEmotionDto: UpdatePetEmotionDto,
  ): Promise<PetEmotion> {
    const updateResult = await this.emotionsRepository.update(
      id,
      updatePetEmotionDto,
    );

    if (updateResult.affected === 0) {
      throw new NotFoundException(`Pet emotion with ID ${id} not found`);
    }

    return this.findOne(id);
  }
}

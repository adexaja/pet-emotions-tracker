import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { PetEmotion } from './entities/pet-emotion.entity';
import { CreatePetEmotionDto } from './dto/create-pet-emotion.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdatePetEmotionDto } from './dto/update-pet-emotion-dto';
import { PetEmotionSummary } from './entities/pet-emotion-summary.entity';

@Injectable()
export class PetEmotionService {
  constructor(
    @InjectRepository(PetEmotion)
    private emotionsRepository: Repository<PetEmotion>,

    @InjectRepository(PetEmotionSummary)
    private summaryRepository: Repository<PetEmotionSummary>,
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

  async findByPetAndDate(
    pet: string,
    dateString: string,
  ): Promise<PetEmotion[]> {
    var date = new Date(dateString);
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const emotions = await this.emotionsRepository.find({
      where: { pet: { id: pet }, createdAt: Between(startOfDay, endOfDay) },
    });

    if (!emotions || emotions.length === 0) {
      return [];
    }

    return emotions;
  }

  async findPetEmotionSummaryByDate(
    pet: string,
    dateString: string,
  ): Promise<PetEmotionSummary> {
    var date = new Date(dateString);
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const summary = await this.summaryRepository.findOne({
      where: { pet: { id: pet }, createdAt: Between(startOfDay, endOfDay) },
    });

    if (!summary) {
      throw new NotFoundException(`Pet Emotion Summary not found`);
    }

    return summary;
  }
}

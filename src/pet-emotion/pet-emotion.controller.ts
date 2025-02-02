import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PetEmotionService } from './pet-emotion.service';
import { CreatePetEmotionDto } from './dto/create-pet-emotion.dto';

@Controller('pet-emotions')
export class PetEmotionController {
  constructor(private readonly petEmotionService: PetEmotionService) {}

  @Post()
  create(@Body() createPetEmotionDto: CreatePetEmotionDto) {
    return this.petEmotionService.create(createPetEmotionDto);
  }

  @Get(':id')
  findAllByPetId(@Param('id') id: string) {
    return this.petEmotionService.findByPetId(id);
  }
}

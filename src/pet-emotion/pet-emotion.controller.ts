import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { PetEmotionService } from './pet-emotion.service';
import { CreatePetEmotionDto } from './dto/create-pet-emotion.dto';
import { UpdatePetEmotionDto } from './dto/update-pet-emotion-dto';

@Controller('pet-emotions')
export class PetEmotionController {
  constructor(private readonly petEmotionService: PetEmotionService) {}

  @Post()
  create(@Body() createPetEmotionDto: CreatePetEmotionDto) {
    return this.petEmotionService.create(createPetEmotionDto);
  }
  @Get()
  findAll() {
    return this.petEmotionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petEmotionService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petEmotionService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePetEmotionDto: UpdatePetEmotionDto,
  ) {
    return this.petEmotionService.update(id, updatePetEmotionDto);
  }
  @Get('summary/:pet/:date')
  petSummaryByDate(@Param('pet') pet: string, @Param('date') date: string) {
    return this.petEmotionService.findPetEmotionSummaryByDate(pet, date);
  }
  @Get(':pet/:date')
  petEmotionsByDate(@Param('pet') pet: string, @Param('date') date: string) {
    return this.petEmotionService.findByPetAndDate(pet, date);
  }
}

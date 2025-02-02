import { PartialType } from '@nestjs/mapped-types';
import { CreatePetEmotionDto } from './create-pet-emotion.dto';

export class UpdatePetEmotionDto extends PartialType(CreatePetEmotionDto) {}

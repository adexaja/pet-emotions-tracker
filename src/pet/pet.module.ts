import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import DataSource from '../config/typeorm.config';

@Module({
  controllers: [PetController],
  providers: [PetService],
  imports: [TypeOrmModule.forFeature([Pet], DataSource)],
  exports: [TypeOrmModule],
})
export class PetModule {}

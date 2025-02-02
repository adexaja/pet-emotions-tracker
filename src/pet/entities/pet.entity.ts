import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { PetEmotion } from '../../pet-emotion/entities/pet-emotion.entity';

@Entity('pets')
export class Pet extends BaseEntity {
  @Column()
  name: string;

  @Column()
  species: string;

  @Column({ nullable: true })
  breed: string;

  @OneToMany(() => PetEmotion, (petEmotion) => petEmotion.pet) // The important part
  emotions: PetEmotion;
}

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { Pet } from '../../pet/entities/pet.entity';

@Entity('pet_emotion_summaries')
export class PetEmotionSummary extends BaseEntity {
  @Column('text')
  summary: string;

  @ManyToOne(() => Pet, (Pet) => Pet.id, { cascade: true })
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;
}

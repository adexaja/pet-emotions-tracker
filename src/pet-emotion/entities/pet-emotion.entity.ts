import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { Pet } from '../../pet/entities/pet.entity';

@Entity('emotions')
export class PetEmotion extends BaseEntity {
  @Column('text')
  emotion: string;

  @Column('text')
  notes: string;

  @Column('int4')
  intensity: number;

  @ManyToOne(() => Pet, (Pet) => Pet.id, { cascade: true })
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;
}

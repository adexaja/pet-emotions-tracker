import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base.entity';

@Entity('pets')
export class Pet extends BaseEntity {
  @Column()
  name: string;

  @Column()
  species: string;

  @Column({ nullable: true })
  breed: string;
}

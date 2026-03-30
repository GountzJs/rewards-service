import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Embeecard } from './embeecard.entity';

@Entity({ name: 'embeecard_category' })
export class EmbeecardCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column()
  name: string;

  @OneToMany(() => Embeecard, (embeecard) => embeecard.category)
  embeecards: Embeecard[];
}

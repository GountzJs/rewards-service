import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sticker } from './sticker.entity';

@Entity({ name: 'team' })
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column()
  name: string;

  @Column()
  seed: string;

  @OneToMany(() => Sticker, (sticker) => sticker.team)
  stickers: Sticker[];
}

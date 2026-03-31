import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sticker } from './sticker.entity';

@Entity({ name: 'country' })
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  cover: string;

  @OneToMany(() => Sticker, (sticker) => sticker.country)
  stickers: Sticker[];
}

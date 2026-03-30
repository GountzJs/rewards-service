import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sticker } from './sticker.entity';

@Entity({ name: 'lolrole' })
export class LolRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column()
  name: string;

  @OneToMany(() => Sticker, (sticker) => sticker.lolRole)
  stickers: Sticker[];
}

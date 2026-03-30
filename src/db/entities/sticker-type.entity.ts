import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sticker } from './sticker.entity';

@Entity({ name: 'sticker_type' })
export class StickerType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column({ type: 'int' })
  orden: number;

  @Column()
  name: string;

  @OneToMany(() => Sticker, (sticker) => sticker.stickerType)
  stickers: Sticker[];
}

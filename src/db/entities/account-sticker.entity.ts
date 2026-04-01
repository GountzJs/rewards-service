import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { Sticker } from './sticker.entity';

@Entity({ name: 'account_sticker' })
export class AccountSticker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ name: 'account_id' })
  accountId: string;

  @ManyToOne(() => Account, (account) => account.accountStickers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'sticker_id' })
  stickerId: string;

  @ManyToOne(() => Sticker, (sticker) => sticker.accountStickers)
  @JoinColumn({ name: 'sticker_id' })
  sticker: Sticker;
}

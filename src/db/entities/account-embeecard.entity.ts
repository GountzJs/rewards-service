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
import { Embeecard } from './embeecard.entity';

@Entity({ name: 'account_embeecard' })
export class AccountEmbeecard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ name: 'account_id' })
  accountId: string;

  @ManyToOne(() => Account, (account) => account.accountEmbeecards)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'embeecard_id' })
  embeecardId: string;

  @ManyToOne(() => Embeecard, (embeecard) => embeecard.accountEmbeecards)
  @JoinColumn({ name: 'embeecard_id' })
  embeecard: Embeecard;
}

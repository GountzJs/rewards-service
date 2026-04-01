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
import { Lck2026 } from './lck2026.entity';

@Entity({ name: 'account_lck2026' })
export class AccountLck2026 {
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

  @ManyToOne(() => Account, (account) => account.accountLck2026, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'lck2026_id' })
  lck2026Id: string;

  @ManyToOne(() => Lck2026, (lck2026) => lck2026.accountLck2026)
  @JoinColumn({ name: 'lck2026_id' })
  lck2026: Lck2026;
}

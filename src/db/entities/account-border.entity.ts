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
import { Border } from './border.entity';

@Entity({ name: 'account_border' })
export class AccountBorder {
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

  @ManyToOne(() => Account, (account) => account.accountBorders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'border_id' })
  borderId: string;

  @ManyToOne(() => Border, (border) => border.accountBorders)
  @JoinColumn({ name: 'border_id' })
  border: Border;
}

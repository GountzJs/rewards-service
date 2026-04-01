import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountLck2026 } from './account-lck2026.entity';

@Entity({ name: 'lck2026' })
export class Lck2026 {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column()
  background: string;

  @Column()
  cover: string;

  @OneToMany(() => AccountLck2026, (accountLck2026) => accountLck2026.lck2026)
  accountLck2026: AccountLck2026[];
}

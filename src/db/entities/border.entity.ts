import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountBorder } from './account-border.entity';

@Entity({ name: 'border' })
export class Border {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column()
  cover: string;

  @Column()
  name: string;

  @Column({ name: 'is_special', default: false })
  isSpecial: string;

  @OneToMany(() => AccountBorder, (accountBorder) => accountBorder.border)
  accountBorders: AccountBorder[];
}

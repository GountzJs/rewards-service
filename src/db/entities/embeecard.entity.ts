import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEmbeecard } from './account-embeecard.entity';
import { EmbeecardCategory } from './embeecard_category.entity';

@Entity({ name: 'embeecard' })
export class Embeecard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ unique: true })
  identify: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => EmbeecardCategory, (category) => category.embeecards)
  @JoinColumn({ name: 'category_id' })
  category: EmbeecardCategory;

  @OneToMany(
    () => AccountEmbeecard,
    (accountEmbeecard) => accountEmbeecard.embeecard,
  )
  accountEmbeecards: AccountEmbeecard[];
}

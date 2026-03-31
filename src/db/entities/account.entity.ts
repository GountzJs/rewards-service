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
import { AccountBorder } from './account-border.entity';
import { AccountEmbeecard } from './account-embeecard.entity';
import { AccountSticker } from './account-sticker.entity';
import { AccountTicket } from './account-ticket.entity';
import { Platform } from './platform.entity';

@Entity({ name: 'account' })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  ref: string;

  @Column()
  team: string;

  @Column({ name: 'is_staff', default: false })
  isStaff: boolean;

  @Column({ name: 'platform_id' })
  platformId: string;

  @ManyToOne(() => Platform, (platform) => platform.accounts)
  @JoinColumn({ name: 'platform_id' })
  platform: Platform;

  @OneToMany(() => AccountBorder, (accountBorder) => accountBorder.account)
  accountBorders: AccountBorder[];

  @OneToMany(
    () => AccountEmbeecard,
    (accountEmbeecard) => accountEmbeecard.account,
  )
  accountEmbeecards: AccountEmbeecard[];

  @OneToMany(() => AccountSticker, (accountSticker) => accountSticker.account)
  accountStickers: AccountSticker[];

  @OneToMany(() => AccountTicket, (accountTicket) => accountTicket.account)
  accountTickets: AccountTicket[];
}

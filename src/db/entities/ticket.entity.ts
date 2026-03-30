import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountTicket } from './account-ticket.entity';

@Entity({ name: 'team' })
export class Ticket {
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

  @Column()
  hourMx: string;

  @Column()
  hourArg: string;

  @Column()
  url: string;

  @OneToMany(() => AccountTicket, (accountTicket) => accountTicket.ticket)
  accountTickets: AccountTicket[];
}

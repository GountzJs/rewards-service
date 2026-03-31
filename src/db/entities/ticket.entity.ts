import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountTicket } from './account-ticket.entity';

@Entity({ name: 'ticket' })
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column({ nullable: true })
  cover: string;

  @Column()
  name: string;

  @Column({ name: 'hour_mx', nullable: true })
  hourMx: string;

  @Column({ name: 'hour_arg', nullable: true })
  hourArg: string;

  @Column({ nullable: true })
  url: string;

  @OneToMany(() => AccountTicket, (accountTicket) => accountTicket.ticket)
  accountTickets: AccountTicket[];
}

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
import { Ticket } from './ticket.entity';

@Entity({ name: 'account_ticket' })
export class AccountTicket {
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

  @ManyToOne(() => Account, (account) => account.accountTickets)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'ticket_id' })
  ticketId: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.accountTickets)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;
}

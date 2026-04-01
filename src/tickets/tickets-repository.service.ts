import { AccountTicket } from '@/db/entities/account-ticket.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TicketEntity } from './entities/ticket.entity';

@Injectable()
export class TicketsRepositoryService {
  constructor(
    @Inject('ACCOUNT_TICKET_REPOSITORY')
    private readonly accountTicketRepository: Repository<AccountTicket>,
  ) {}

  async getTickets(accountId: string): Promise<TicketEntity[]> {
    const items = await this.accountTicketRepository
      .createQueryBuilder('at')
      .innerJoinAndSelect('at.ticket', 'ticket')
      .where('at.account_id = :accountId', { accountId })
      .orderBy('at.updatedAt', 'DESC')
      .getMany();

    return items.map((item) => ({
      url: item.ticket.url,
      cover: item.ticket.cover,
      name: item.ticket.name,
      hourMx: item.ticket.hourMx,
      hourArg: item.ticket.hourArg,
      date: item.ticket.date,
    }));
  }
}

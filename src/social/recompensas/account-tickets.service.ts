/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AccountTicket } from '@/db/entities/account-ticket.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AccountTicketsService {
  constructor(
    @Inject('ACCOUNT_TICKET_REPOSITORY')
    private readonly accountTicketRepository: Repository<AccountTicket>,
  ) {}

  async addTicket(ticketId: string, accountId: string) {
    const existingTicket = await this.accountTicketRepository.findOne({
      where: { ticketId, accountId },
    });

    if (existingTicket)
      throw new Error(`Ya canjeaste el ticket del enfrentamiento`);

    const newAccountTicket = this.accountTicketRepository.create({
      ticketId,
      accountId,
    });

    return this.accountTicketRepository.save(newAccountTicket);
  }
}

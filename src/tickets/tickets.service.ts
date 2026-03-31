import { Injectable } from '@nestjs/common';
import { TicketEntity } from './entities/ticket.entity';
import { TicketsRepositoryService } from './tickets-repository.service';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepository: TicketsRepositoryService) {}

  async getTickets(accountId: string): Promise<TicketEntity[]> {
    return this.ticketsRepository.getTickets(accountId);
  }
}

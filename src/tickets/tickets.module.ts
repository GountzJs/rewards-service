import { DBModule } from '@/db/db.module';
import { AccountTicket } from '@/db/entities/account-ticket.entity';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TicketsRepositoryService } from './tickets-repository.service';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [DBModule],
  controllers: [TicketsController],
  providers: [
    {
      provide: 'ACCOUNT_TICKET_REPOSITORY',

      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AccountTicket),
      inject: ['DATA_SOURCE'],
    },
    TicketsService,
    TicketsRepositoryService,
  ],
})
export class TicketsModule {}

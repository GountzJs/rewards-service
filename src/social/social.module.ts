import { DBModule } from '@/db/db.module';
import { AccountBorder } from '@/db/entities/account-border.entity';
import { AccountEmbeecard } from '@/db/entities/account-embeecard.entity';
import { AccountLck2026 } from '@/db/entities/account-lck2026.entity';
import { AccountTicket } from '@/db/entities/account-ticket.entity';
import { Account } from '@/db/entities/account.entity';
import { Border } from '@/db/entities/border.entity';
import { Embeecard } from '@/db/entities/embeecard.entity';
import { Lck2026 } from '@/db/entities/lck2026.entity';
import { Platform } from '@/db/entities/platform.entity';
import { TicketsModule } from '@/tickets/tickets.module';
import { TwitchModule } from '@/twitch/twitch.module';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';
import { ChatHandlerService } from './chat-handler.service';
import { TwitchClientService } from './lib/twitch-client.service';
import recompensas from './recompensas/recompensas';
import { TwitchChatService } from './twitch-chat.service';

@Module({
  imports: [
    DBModule,
    TwitchModule,
    EventEmitterModule.forRoot(),
    TicketsModule,
  ],
  providers: [
    {
      provide: 'ACCOUNT_TICKET_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AccountTicket),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'ACCOUNT_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Account),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'PLATFORM_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Platform),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'EMBEECARD_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Embeecard),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'ACCOUNT_EMBEECARD_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AccountEmbeecard),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'BORDER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Border),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'ACCOUNT_BORDER_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AccountBorder),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'LCK2026_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Lck2026),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'ACCOUNT_LCK2026_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AccountLck2026),
      inject: ['DATA_SOURCE'],
    },
    TwitchClientService,
    TwitchChatService,
    ChatHandlerService,
    ...recompensas,
  ],
})
export class SocialModule {}

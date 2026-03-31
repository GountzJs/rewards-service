import { DBModule } from '@/db/db.module';
import { Account } from '@/db/entities/account.entity';
import { Platform } from '@/db/entities/platform.entity';
import { TwitchModule } from '@/twitch/twitch.module';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountsRepositoryService } from './accounts-repository.service';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { PlatformRepositoryService } from './platform-repository.service';

@Module({
  imports: [DBModule, TwitchModule],
  controllers: [AccountsController],
  providers: [
    {
      provide: 'ACCOUNT_REPOSITORY',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Account),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'PLATFORM_REPOSITORY',

      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Platform),
      inject: ['DATA_SOURCE'],
    },
    AccountsService,
    AccountsRepositoryService,
    PlatformRepositoryService,
  ],
})
export class AccountsModule {}

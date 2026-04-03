import { DBModule } from '@/db/db.module';
import { AccountLck2026 } from '@/db/entities/account-lck2026.entity';
import { Account } from '@/db/entities/account.entity';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Lck2026RepositoryService } from './lck2026-repository.service';
import { Lck2026Controller } from './lck2026.controller';
import { Lck2026Service } from './lck2026.service';

@Module({
  imports: [DBModule],
  controllers: [Lck2026Controller],
  providers: [
    {
      provide: 'ACCOUNT_LCK2026_REPOSITORY',

      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AccountLck2026),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'ACCOUNT_REPOSITORY',

      useFactory: (dataSource: DataSource) => dataSource.getRepository(Account),
      inject: ['DATA_SOURCE'],
    },
    Lck2026Service,
    Lck2026RepositoryService,
  ],
})
export class Lck2026Module {}

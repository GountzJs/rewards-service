import { DBModule } from '@/db/db.module';
import { AccountLck2026 } from '@/db/entities/account-lck2026.entity';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Lck2026RepositoryService } from './lck2026-repository.service';
import { Lck2026Service } from './lck2026.service';

@Module({
  imports: [DBModule],
  providers: [
    {
      provide: 'ACCOUNT_LCK2026_REPOSITORY',

      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AccountLck2026),
      inject: ['DATA_SOURCE'],
    },
    Lck2026Service,
    Lck2026RepositoryService,
  ],
})
export class Lck2026Module {}

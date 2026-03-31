import { DBModule } from '@/db/db.module';
import { AccountEmbeecard } from '@/db/entities/account-embeecard.entity';
import { EmbeecardCategory } from '@/db/entities/embeecard_category.entity';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EmbeecardsRepositoryService } from './embeecards-repository.service';
import { EmbeecardsController } from './embeecards.controller';
import { EmbeecardsService } from './embeecards.service';

@Module({
  imports: [DBModule],
  controllers: [EmbeecardsController],
  providers: [
    {
      provide: 'ACCOUNT_EMBEECARD_REPOSITORY',

      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AccountEmbeecard),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'EMBEECARD_CATEGORY_REPOSITORY',

      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(EmbeecardCategory),
      inject: ['DATA_SOURCE'],
    },
    EmbeecardsRepositoryService,
    EmbeecardsService,
  ],
})
export class EmbeecardsModule {}

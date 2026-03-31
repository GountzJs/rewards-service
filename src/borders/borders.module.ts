import { DBModule } from '@/db/db.module';
import { AccountBorder } from '@/db/entities/account-border.entity';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BordersRepositoryService } from './borders-repository.service';
import { BordersController } from './borders.controller';
import { BordersService } from './borders.service';

@Module({
  imports: [DBModule],
  controllers: [BordersController],
  providers: [
    {
      provide: 'ACCOUNT_BORDER_REPOSITORY',

      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AccountBorder),
      inject: ['DATA_SOURCE'],
    },
    BordersService,
    BordersRepositoryService,
  ],
})
export class BordersModule {}

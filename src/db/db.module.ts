import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { entitiesProviders } from './providers';

@Module({
  providers: [...databaseProviders, ...entitiesProviders],
  exports: [...databaseProviders],
})
export class DBModule {}

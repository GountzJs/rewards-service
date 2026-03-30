import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { modules } from './modules';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ...modules],
})
export class AppModule {}

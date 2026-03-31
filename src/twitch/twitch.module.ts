import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TwitchService } from './twitch.service';

@Module({
  imports: [HttpModule],
  providers: [TwitchService],
  exports: [TwitchService],
})
export class TwitchModule {}

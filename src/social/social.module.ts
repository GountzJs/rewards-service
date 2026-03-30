/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChatHandlerService } from './chat-handler.service';
import { TwitchChatService } from './twitch-chat.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [TwitchChatService, ChatHandlerService],
})
export class SocialModule {}

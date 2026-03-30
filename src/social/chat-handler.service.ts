/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export interface TwitchMessagePayload {
  channel: string;
  username: string;
  userId: string;
  message: string;
  tags: Record<string, unknown>;
}

@Injectable()
export class ChatHandlerService {
  private readonly logger = new Logger(ChatHandlerService.name);

  @OnEvent('twitch.message')
  handleMessage(payload: TwitchMessagePayload) {
    // const isMod = payload['tags'].mod;
    // const isCreator = payload['tags'].username === payload.channel;

    if (payload.message.startsWith('!')) this.handleCommand(payload);
  }

  private handleCommand(payload: TwitchMessagePayload) {
    const [command, args] = payload.message.slice(1).split(' ');
    this.logger.log(`Comando: ${command}, args: ${args}`);
  }
}

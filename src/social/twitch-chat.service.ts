/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Client } from 'tmi.js';

@Injectable()
export class TwitchChatService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(TwitchChatService.name);
  private client: Client;

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const channels: string[] = this.configService
      .get('TWITCH_CHANNELS')
      .split(',');
    this.client = new Client({
      options: { debug: false },
      identity: {
        username: this.configService.get('TWITCH_USERNAME'),
        password: `oauth:${this.configService.get('TWITCH_API_TOKEN')}`,
      },
      channels,
    });

    this.client.on('message', (channel, tags, message, self) => {
      if (self) return;

      this.logger.debug(`[${channel}] ${tags['display-name']}: ${message}`);

      this.eventEmitter.emit('twitch.message', {
        channel,
        message,
        tags,
      });
    });

    this.client.on('connected', (addr, port) => {
      this.logger.log(`TMI conectado a ${addr}:${port}`);
    });

    this.client.on('disconnected', (reason) => {
      this.logger.warn(`TMI desconectado: ${reason}`);
    });

    try {
      await this.client.connect();
    } catch (err) {
      this.logger.error('Error conectando TMI', err);
    }
  }

  async onApplicationShutdown() {
    if (this.client) {
      await this.client.disconnect();
      this.logger.log('TMI desconectado correctamente');
    }
  }

  async say(channel: string, message: string) {
    await this.client.say(channel, message);
  }
}

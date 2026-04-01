/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Events } from 'tmi.js';

@Injectable()
export class TwitchClientService {
  private client: Client;

  constructor(private readonly configService: ConfigService) {}

  create(): void {
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
  }

  connect() {
    return this.client.connect();
  }

  disconnect() {
    return this.client.disconnect();
  }

  on(event: keyof Events, listener: (...args: never) => void) {
    return this.client.on(event, listener);
  }

  async say(channel: string, message: string) {
    await this.client.say(channel, message);
  }
}

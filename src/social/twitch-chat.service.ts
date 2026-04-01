import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TwitchClientService } from './lib/twitch-client.service';

@Injectable()
export class TwitchChatService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(TwitchChatService.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly twitchClientService: TwitchClientService,
  ) {}

  async onApplicationBootstrap() {
    this.twitchClientService.create();

    this.twitchClientService.on('message', (channel, tags, message, self) => {
      if (self) return;

      this.logger.debug('Message entry', { channel, tags, message, self });

      this.eventEmitter.emit('twitch.message', {
        channel,
        username: tags['username'],
        userId: tags['user-id'],
        message,
        tags,
      });
    });

    this.twitchClientService.on('connected', (addr: string, port: string) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.twitchClientService.say(
        `#gountzbot`,
        '!message success-🤖 Bot inicializado.',
      );
      this.logger.log(`TMI conectado a ${addr}:${port}`);
    });

    this.twitchClientService.on('disconnected', (reason) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      this.logger.warn(`TMI desconectado: ${reason}`);
    });

    try {
      await this.twitchClientService.connect();
    } catch (err) {
      this.logger.error('Error conectando TMI', err);
    }
  }

  async onApplicationShutdown() {
    await this.twitchClientService.disconnect();
    this.logger.log('TMI desconectado correctamente');
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { ChatUserstate } from 'tmi.js';
import { lolTeams, TLolTeams } from './core/consts';
import { RewardsState } from './lib/rewards-state';
import { TwitchClientService } from './lib/twitch-client.service';
import { ActionsService } from './recompensas/actions.service';

export interface TwitchMessagePayload {
  channel: string;
  username: string;
  userId: string;
  message: string;
  tags: ChatUserstate;
}

@Injectable()
export class ChatHandlerService {
  private readonly logger = new Logger(ChatHandlerService.name);
  private readonly rewardsState: RewardsState;
  private channels: string[];

  constructor(
    private readonly actionsService: ActionsService,
    private readonly twitchClientService: TwitchClientService,
    private readonly configService: ConfigService,
  ) {
    this.rewardsState = new RewardsState();
    this.channels = (this.configService.get('TWITCH_CHANNELS') as string).split(
      ',',
    );
  }

  @OnEvent('twitch.message')
  handleMessage(payload: TwitchMessagePayload) {
    if (payload.message.startsWith('!')) this.handleCommand(payload);
  }

  private sendBotMessage(message: string): void {
    this.twitchClientService.say('#gountzbot', message);
  }

  private sendStreamerMessage(message: string): void {
    this.twitchClientService.say('#embeejayz', message);
  }

  private handleCommand(payload: TwitchMessagePayload) {
    const [command, args] = payload.message.slice(1).split(' ');
    const isCreator = this.channels.some(
      (username) => username === payload.tags['display-name'],
    );
    const isMod = payload.tags['mod'];
    const isCreatorOrMod = isCreator || isMod;

    this.logger.log(`Comando: ${command}, args: ${args}`);

    if (
      this.rewardsState.isTicketActive &&
      command.toLowerCase() === 'reward'
    ) {
      this.actionsService
        .insertSpecial(
          payload.tags['display-name']!,
          this.rewardsState.idTicket,
        )
        .then((res) => this.sendBotMessage(res))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        .catch((err) => this.sendBotMessage(err.message));
    }

    if (isCreatorOrMod && command.toLowerCase() === 'ping') {
      this.sendStreamerMessage(`🤖 @${payload.tags['display-name']}: Pong`);
      return;
    }

    if (isCreatorOrMod && command.toLowerCase() === 'id-ticket') {
      this.sendBotMessage(`🤖 ${this.rewardsState.idTicket}`);
      return;
    }

    if (isCreatorOrMod && command.toLowerCase() === 'agregar-ticket') {
      const idTicket = args;
      this.rewardsState.idTicket = idTicket;
      this.sendBotMessage(`🤖 Ticket del enfrentamient agregado!`);
      return;
    }

    if (isCreatorOrMod && command.toLowerCase() === 'ticket-special') {
      this.rewardsState.toggleTicket();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.rewardsState.isTicketActive
        ? this.sendBotMessage(
            `!message success-🤖 Se activó el ticket del enfrentamiento`,
          )
        : this.sendBotMessage(
            `!message success-🤖 Se desactivo el ticket del enfrentamiento.`,
          );
      return;
    }

    if (isCreatorOrMod && command.toLowerCase() === 'card') {
      const displayName = args
        .replace('@', '')
        .replace(/[^a-zA-Z0-9_-\s]/g, '')
        .trim();

      this.actionsService
        .insertRandomEmbeecard(displayName)
        .then((m) => this.sendBotMessage(m))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        .catch((e) => this.sendBotMessage(e.message));
      return;
    }

    if (isCreatorOrMod && command.toLowerCase() === 'small-pack') {
      const displayName = args
        .replace('@', '')
        .replace(/[^a-zA-Z0-9_-\s]/g, '')
        .trim();
      this.actionsService
        .insertManyRandom(displayName, 3)
        .then((m) => this.sendBotMessage(m))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        .catch((e) => this.sendBotMessage(e.message));
      return;
    }

    if (isCreatorOrMod && command.toLowerCase() === 'pack') {
      const displayName = args
        .replace('@', '')
        .replace(/[^a-zA-Z0-9_-\s]/g, '')
        .trim();
      this.actionsService
        .insertManyRandom(displayName, 6)
        .then((m) => this.sendBotMessage(m))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        .catch((e) => this.sendBotMessage(e.message));
      return;
    }

    if (isCreatorOrMod && command.toLowerCase() === 'big-pack') {
      const displayName = args
        .replace('@', '')
        .replace(/[^a-zA-Z0-9_-\s]/g, '')
        .trim();
      this.actionsService
        .insertManyRandom(displayName, 12)
        .then((m) => this.sendBotMessage(m))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        .catch((e) => this.sendBotMessage(e.message));
      return;
    }

    if (isCreatorOrMod && command.toLowerCase() === 'lck-pack') {
      const displayName = args
        .replace('@', '')
        .replace(/[^a-zA-Z0-9_-\s]/g, '')
        .trim();
      this.actionsService
        .insertPackLck2026(displayName)
        .then((m) => this.sendBotMessage(m))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        .catch((e) => this.sendBotMessage(e.message));
      return;
    }

    if (command === '!mi-equipo') {
      const newTeam = args.trim().toUpperCase();
      const validTeams = Object.values(lolTeams);

      if (!validTeams.includes(newTeam as TLolTeams)) {
        this.sendStreamerMessage(
          `🤖 @${payload.tags['display-name']}: El equipo que ingresaste no es válido.`,
        );
        return;
      }
      this.actionsService.addTeam(newTeam, payload.tags['display-name']!);
      return;
    }

    if (command === 'mi-perfil') {
      const displayName = payload.tags['display-name']!;
      this.sendStreamerMessage(
        `🤖 Tu perfil @${
          displayName
        }: https://coleccionables.embeejayz.com/usuarios/${displayName.toLowerCase()}`,
      );
      return;
    }

    if (isCreatorOrMod && command === 'perfil') {
      const username = args.trim().replace('@', '');
      this.sendStreamerMessage(
        `🤖 Tu perfil @${username}: https://coleccionables.embeejayz.com/usuarios/${username.toLowerCase()}`,
      );
      return;
    }
  }
}

import { TwitchService } from '@/twitch/twitch.service';
import { Injectable } from '@nestjs/common';
import { SizePack } from '../models/enums/size-pack.enum';
import { AccountEmbeecardService } from './account-embeecard.service';
import { AccountLck2026Service } from './account-lck2026.service';
import { AccountTicketsService } from './account-tickets.service';
import { AccountsService } from './accounts.service';

@Injectable()
export class ActionsService {
  constructor(
    private readonly twitchService: TwitchService,
    private readonly accountService: AccountsService,
    private readonly ticketService: AccountTicketsService,
    private readonly embeecardsService: AccountEmbeecardService,
    private readonly accountLck2026Service: AccountLck2026Service,
  ) {}

  private async getORCreateAccount(username: string) {
    const twitchUser = await this.twitchService.getByUsername(username);
    const accountID = await this.accountService.getOrCreateAccount(
      twitchUser.data.id,
    );
    return accountID;
  }

  private getPack(quantity: number) {
    if (quantity === 3) return SizePack.SmallPack;
    if (quantity === 6) return SizePack.MediumPack;
    return SizePack.BigPack;
  }

  async insertSpecial(username: string, ticketId: string): Promise<string> {
    try {
      const accountId = await this.getORCreateAccount(username);
      await this.ticketService.addTicket(ticketId, accountId);
      return `!notification ticket-1-false-${username}`;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'No se pudo canjear el ticket del enfrentamiento';
      throw new Error(`!message error-@${username}: ${errorMessage}`);
    }
  }

  async insertEmbeeCardSpecial(username: string, cardId: string) {
    try {
      const accountId = await this.getORCreateAccount(username);
      await this.embeecardsService.assignSpecial(cardId, accountId);
      return `!notification card-0-true-${username}`;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'No se pudo canjear la carta especial';
      throw new Error(`!message error-${errorMessage}`);
    }
  }

  async insertRandomEmbeecard(username: string) {
    try {
      const accountId = await this.getORCreateAccount(username);
      const cardId = await this.embeecardsService.getRandom(accountId);
      await this.embeecardsService.insertOrIncrement(accountId, cardId);
      return `!notification card-${SizePack.Individual}-false-${username}`;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'No se pudo canjear la carta aleatoria';
      throw new Error(`!message error-${errorMessage}`);
    }
  }

  async insertManyRandom(username: string, quantity: number): Promise<string> {
    try {
      const accountId = await this.getORCreateAccount(username);
      for (let i = 0; i < quantity; i++) {
        const cardId = await this.embeecardsService.getRandom(accountId);

        await this.embeecardsService.insertOrIncrement(accountId, cardId);
      }

      const pack = this.getPack(quantity);
      return `!notification card-${pack}-false-${username}`;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'No se pudo canjear la carta aleatoria';
      throw new Error(`!message error-${errorMessage}`);
    }
  }

  async addTeam(team: string, username: string): Promise<string> {
    try {
      const accountId = await this.getORCreateAccount(username);
      await this.accountService.addTeam(accountId, team);
      return `!message success-@${username}: Equipo asignado correctamente`;
    } catch {
      throw new Error(
        `!message error-@${username}: No pudimos asignar tu equipo, vuelva a intentarlo más tarde`,
      );
    }
  }

  async insertPackLck2026(username: string): Promise<string> {
    const quantity = 3;
    try {
      const accountId = await this.getORCreateAccount(username);

      for (let i = 0; i < quantity; i++) {
        const cardId = await this.accountLck2026Service.getRandom(accountId);
        await this.accountLck2026Service.insertOrIncrement(accountId, cardId);
      }

      return `!notification lck2026-false-${username}`;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'No se pudo canjear el pack lck 2026';
      throw new Error(`!message error-${errorMessage}`);
    }
  }
}

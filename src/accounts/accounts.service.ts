/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TwitchService } from '@/twitch/twitch.service';
import { Injectable } from '@nestjs/common';
import { AccountsRepositoryService } from './accounts-repository.service';
import { PlatformRepositoryService } from './platform-repository.service';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountsRepositoryService: AccountsRepositoryService,
    private readonly platformRepositoryService: PlatformRepositoryService,
    private readonly twitchService: TwitchService,
  ) {}

  async getRanking(): Promise<any[]> {
    const ranking = await this.accountsRepositoryService.getRanking();
    const users = await this.twitchService.getByIds(ranking.map((r) => r.ref));
    return ranking.map((rnk) => {
      const user = users.find((u) => u.id === rnk.ref);

      return {
        id: rnk._id,
        username: user?.display_name,
        total: {
          borders: rnk.totalBorders,
          cards: rnk.totalCards,
        },
      };
    });
  }

  async getProfile(username: string) {
    const platform = await this.platformRepositoryService.getByName('TWITCH');

    if (!platform) {
      throw new Error('Platform not found');
    }

    const { data } = await this.twitchService.getByUsername(username);

    const account = await this.accountsRepositoryService.getByRef(
      data.id,
      platform.id,
    );

    let totalBorders = 0;
    let totalCards = 0;

    if (account) {
      totalBorders = account.accountBorders.reduce(
        (sum, b) => sum + b.quantity,
        0,
      );
      totalCards = account.accountEmbeecards.reduce(
        (sum, e) => sum + e.quantity,
        0,
      );
    }

    return {
      id: account?.id || data.id,
      avatar: data.profile_image_url,
      username: data.display_name,
      team: account?.team || null,
      total: {
        borders: totalBorders,
        cards: totalCards,
        general: totalBorders + totalCards,
      },
    };
  }
}

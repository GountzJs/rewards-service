import { Injectable } from '@nestjs/common';
import { Lck2026RepositoryService } from './lck2026-repository.service';

@Injectable()
export class Lck2026Service {
  constructor(private readonly lck2026Repository: Lck2026RepositoryService) {}

  async getCards(accountId: string): Promise<any> {
    const items = await this.lck2026Repository.getCards(accountId);
    return items.map((item) => ({
      id: item.lck2026.id,
      createdAt: item.lck2026.createdAt,
      updatedAt: item.lck2026.updatedAt,
      background: item.lck2026.background,
      cover: item.lck2026.cover,
    }));
  }

  async findLastCards(ref: string): Promise<any> {
    const account = await this.lck2026Repository.findAccountByRef(ref);

    if (!account) {
      throw new Error('Account not found');
    }

    const cards = await this.lck2026Repository.findLastCards(account.id);

    return cards.map((card) => card.lck2026);
  }
}

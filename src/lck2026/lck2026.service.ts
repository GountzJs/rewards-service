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

  async findLastCards(id: string): Promise<any> {
    const cards = await this.lck2026Repository.findLastCards(id);

    return cards.map((card) => card.lck2026);
  }
}

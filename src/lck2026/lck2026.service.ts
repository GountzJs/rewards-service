import { Injectable } from '@nestjs/common';
import { Lck2026RepositoryService } from './lck2026-repository.service';

@Injectable()
export class Lck2026Service {
  constructor(private readonly lck2026Repository: Lck2026RepositoryService) {}

  async getCards(accountId: string): Promise<any> {
    return this.lck2026Repository.getCards(accountId);
  }
}

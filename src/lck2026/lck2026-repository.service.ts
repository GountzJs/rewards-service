import { AccountLck2026 } from '@/db/entities/account-lck2026.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class Lck2026RepositoryService {
  constructor(
    @Inject('ACCOUNT_LCK2026_REPOSITORY')
    private readonly accountLck2026Repository: Repository<AccountLck2026>,
  ) {}

  async getCards(accountId: string): Promise<AccountLck2026[]> {
    const items = await this.accountLck2026Repository
      .createQueryBuilder('al')
      .innerJoinAndSelect('al.lck2026', 'lck2026')
      .where('al.account_id = :accountId', { accountId })
      .orderBy('al.updatedAt', 'DESC')
      .getMany();

    return items;
  }
}

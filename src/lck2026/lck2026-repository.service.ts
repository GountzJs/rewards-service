import { AccountLck2026 } from '@/db/entities/account-lck2026.entity';
import { Account } from '@/db/entities/account.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class Lck2026RepositoryService {
  constructor(
    @Inject('ACCOUNT_LCK2026_REPOSITORY')
    private readonly accountLck2026Repository: Repository<AccountLck2026>,
    @Inject('ACCOUNT_REPOSITORY')
    private readonly accountRepository: Repository<Account>,
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

  async findAccountByRef(ref: string): Promise<Account | null> {
    return this.accountRepository.findOne({
      where: { ref },
    });
  }

  async findLastCards(accountId: string): Promise<AccountLck2026[]> {
    return this.accountLck2026Repository.find({
      where: { accountId },
      relations: ['lck2026'],
      order: { updatedAt: 'DESC' },
      take: 3,
    });
  }
}

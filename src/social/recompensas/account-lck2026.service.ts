/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AccountLck2026 } from '@/db/entities/account-lck2026.entity';
import { Lck2026 } from '@/db/entities/lck2026.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AccountLck2026Service {
  constructor(
    @Inject('ACCOUNT_LCK2026_REPOSITORY')
    private readonly accountLck2026Repository: Repository<AccountLck2026>,
    @Inject('LCK2026_REPOSITORY')
    private readonly lck2026Repository: Repository<Lck2026>,
  ) {}

  async insertOrIncrement(accountId: string, lck2026Id: string) {
    const relation = await this.accountLck2026Repository.findOne({
      where: { accountId, lck2026Id },
    });

    if (!relation) {
      const newRelation = this.accountLck2026Repository.create({
        accountId,
        lck2026Id,
        quantity: 1,
      });

      await this.accountLck2026Repository.save(newRelation);
      return { quantity: 1, accountId, lck2026Id };
    }

    relation.quantity += 1;
    await this.accountLck2026Repository.save(relation);

    return {
      quantity: relation.quantity,
      accountId,
      lck2026Id,
    };
  }

  async getRandom(): Promise<string> {
    const result = await this.lck2026Repository
      .createQueryBuilder('l')
      .select('l.id', 'lck2026_id')
      .orderBy('RANDOM()')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new Error('No se encontraron registros en lck2026');
    }

    return result.lck2026_id as string;
  }
}

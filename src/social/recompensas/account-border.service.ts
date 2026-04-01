/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AccountBorder } from '@/db/entities/account-border.entity';
import { Border } from '@/db/entities/border.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AccountBorderService {
  constructor(
    @Inject('ACCOUNT_BORDER_REPOSITORY')
    private readonly accountBorderRepository: Repository<AccountBorder>,
    @Inject('BORDER_REPOSITORY')
    private readonly borderRepository: Repository<Border>,
  ) {}

  async insertOrIncrement(accountId: string, borderId: string) {
    const relation = await this.accountBorderRepository.findOne({
      where: { accountId, borderId },
    });

    if (!relation) {
      const newRelation = this.accountBorderRepository.create({
        accountId,
        borderId,
        quantity: 1,
      });

      await this.accountBorderRepository.save(newRelation);
      return { quantity: 1, accountId, borderId };
    }

    relation.quantity += 1;
    await this.accountBorderRepository.save(relation);

    return {
      quantity: relation.quantity,
      accountId,
      borderId,
    };
  }

  async getRandom(accountId: string): Promise<string> {
    const result = await this.borderRepository
      .createQueryBuilder('b')
      .leftJoin(
        'account_border',
        'ab',
        'ab.border_id = b.id AND ab.account_id = :accountId',
        { accountId },
      )
      .where('b.is_special = false')
      .andWhere('(ab.id IS NULL OR ab.quantity < 7)')
      .orderBy('RANDOM()')
      .select('b.id', 'border_id')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new Error('No hay bordes disponibles');
    }

    return result.border_id as string;
  }
}

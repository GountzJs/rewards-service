/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AccountEmbeecard } from '@/db/entities/account-embeecard.entity';
import { Embeecard } from '@/db/entities/embeecard.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AccountEmbeecardService {
  constructor(
    @Inject('ACCOUNT_EMBEECARD_REPOSITORY')
    private readonly accountEmbeecardRepository: Repository<AccountEmbeecard>,
    @Inject('EMBEECARD_REPOSITORY')
    private readonly embeecardRepository: Repository<Embeecard>,
  ) {}

  async assignSpecial(accountId: string, embeecardId: string) {
    const existing = await this.accountEmbeecardRepository.findOne({
      where: { accountId, embeecardId },
    });

    if (existing) {
      throw new Error('Ya tienes la carta especial asignada');
    }

    const newRelation = this.accountEmbeecardRepository.create({
      accountId,
      embeecardId,
      quantity: 1,
    });

    await this.accountEmbeecardRepository.save(newRelation);

    return { accountId, embeecardId, quantity: 1 };
  }

  async getRandom(accountId: string): Promise<string> {
    const result = await this.embeecardRepository
      .createQueryBuilder('e')
      .innerJoin('e.category', 'ec')
      .leftJoin(
        'account_embeecard',
        'ae',
        'ae.embeecard_id = e.id AND ae.account_id = :accountId',
        { accountId },
      )
      .where("ec.name != 'SPECIAL'")
      .andWhere('(ae.id IS NULL OR ae.quantity < 5)')
      .orderBy('RANDOM()')
      .select('e.id', 'embeecard_id')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new NotFoundException('No hay cartas disponibles');
    }

    return result.embeecard_id as string;
  }

  async insertOrIncrement(accountId: string, embeecardId: string) {
    const relation = await this.accountEmbeecardRepository.findOne({
      where: { accountId, embeecardId },
    });

    if (!relation) {
      const newRelation = this.accountEmbeecardRepository.create({
        accountId,
        embeecardId,
        quantity: 1,
      });

      await this.accountEmbeecardRepository.save(newRelation);
      return { quantity: 1, accountId, embeecardId };
    }

    relation.quantity += 1;
    await this.accountEmbeecardRepository.save(relation);

    return {
      quantity: relation.quantity,
      accountId,
      embeecardId,
    };
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { AccountEmbeecard } from '@/db/entities/account-embeecard.entity';
import { Account } from '@/db/entities/account.entity';
import { EmbeecardCategory } from '@/db/entities/embeecard_category.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EmbeecardsQueryDTO } from './dtos/embeecards-query.dto';
import { EmbeecardPaginationEntity } from './entities/embeecard-pagination.entity';

@Injectable()
export class EmbeecardsRepositoryService {
  constructor(
    @Inject('ACCOUNT_EMBEECARD_REPOSITORY')
    private readonly accountEmbeecardRepository: Repository<AccountEmbeecard>,
    @Inject('EMBEECARD_CATEGORY_REPOSITORY')
    private readonly embeecardCategoryRepository: Repository<EmbeecardCategory>,
    @Inject('ACCOUNT_REPOSITORY')
    private readonly accountRepository: Repository<Account>,
  ) {}

  async getCategorySpecial(): Promise<EmbeecardCategory | null> {
    return this.embeecardCategoryRepository.findOne({
      where: { name: 'SPECIAL' },
    });
  }

  async findAccountByRef(ref: string): Promise<Account | null> {
    return this.accountRepository.findOne({
      where: { ref },
    });
  }

  async findLastCardsByQuantity(
    accountId: string,
    quantity: number,
  ): Promise<AccountEmbeecard[]> {
    return this.accountEmbeecardRepository.find({
      where: { accountId },
      relations: ['embeecard', 'embeecard.category'],
      order: { updatedAt: 'DESC' },
      take: quantity,
    });
  }

  async getById(
    accountId: string,
    specialCategoryId: string,
    query: EmbeecardsQueryDTO,
  ): Promise<EmbeecardPaginationEntity> {
    const { page, limit, order, sort, name } = query;
    const skip = (page - 1) * limit;
    const sortDir = sort.toUpperCase() as 'ASC' | 'DESC';

    const queryBuilder = this.accountEmbeecardRepository
      .createQueryBuilder('ae')
      .innerJoinAndSelect('ae.embeecard', 'embeecard')
      .where('ae.account_id = :accountId', { accountId });

    if (name) {
      queryBuilder.andWhere('embeecard.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (order === 'rare') {
      // Priority: isSpecial (if category matches), then quantity, then updatedAt
      // PostgreSQL handles boolean sorting: true (1) > false (0)
      queryBuilder
        .orderBy(
          `CASE WHEN embeecard.category_id = :specialCategoryId THEN 1 ELSE 0 END`,
          sortDir,
        )
        .setParameter('specialCategoryId', specialCategoryId)
        .addOrderBy('ae.quantity', sortDir)
        .addOrderBy('ae.updatedAt', sortDir);
    } else {
      queryBuilder.orderBy('ae.createdAt', sortDir);
    }

    const total = await queryBuilder.getCount();
    const items = (await queryBuilder
      .offset(skip)
      .limit(limit)
      .getRawMany()) as any;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const formattedItems = items.map((item: any) => ({
      quantity: item.ae_quantity,
      name: item.embeecard_name,
      description: item.embeecard_description,
      identify: item.embeecard_identify,
      categoryId: item.embeecard_category_id,
      isSpecial: item.embeecard_category_id === specialCategoryId,
      createdAt: item.ae_created_at,
      updatedAt: item.ae_updated_at,
    }));

    return {
      actualPage: page,
      total: {
        pages: Math.ceil(total / limit),
        items: total,
      },
      items: formattedItems,
    };
  }
}

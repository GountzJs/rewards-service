/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AccountBorder } from '@/db/entities/account-border.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BordersQueryDTO } from './dtos/border-query.dto';
import { BorderPaginationEntity } from './entities/border-pagination.entity';

@Injectable()
export class BordersRepositoryService {
  constructor(
    @Inject('ACCOUNT_BORDER_REPOSITORY')
    private accountBorderRepository: Repository<AccountBorder>,
  ) {}

  async getById(
    accountId: string,
    query: BordersQueryDTO,
  ): Promise<BorderPaginationEntity> {
    const { page, limit, order, sort, name } = query;
    const skip = (page - 1) * limit;
    const sortDir = sort.toUpperCase() as 'ASC' | 'DESC';

    const queryBuilder = this.accountBorderRepository
      .createQueryBuilder('ab')
      .innerJoinAndSelect('ab.border', 'border')
      .where('ab.account_id = :accountId', { accountId });

    if (name) {
      queryBuilder.andWhere('border.name ILIKE :name', { name: `%${name}%` });
    }

    if (order === 'rank') {
      // Priority: isSpecial (status), then quantity (amount), then createdAt (date)
      // When DESC: Specials first (true > false), then Q 7..1, then Newest first
      // When ASC: Normals first (false < true), then Q 1..7, then Oldest first
      queryBuilder
        .orderBy('border.isSpecial', sortDir)
        .addOrderBy('ab.quantity', sortDir)
        .addOrderBy('ab.updatedAt', sortDir);
    } else {
      queryBuilder.orderBy('ab.updatedAt', sortDir);
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const formattedItems = items.map((item: any) => ({
      quantity: item.quantity,
      name: item.border.name,
      cover: item.border.cover,
      isSpecial: item.border.isSpecial,
      createdAt: item.createdAt,
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

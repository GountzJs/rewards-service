/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { EmbeecardsQueryDTO } from './dtos/embeecards-query.dto';
import { EmbeecardsRepositoryService } from './embeecards-repository.service';

@Injectable()
export class EmbeecardsService {
  constructor(
    private readonly embeecardsRepository: EmbeecardsRepositoryService,
  ) {}

  async getById(
    accountId: string,
    { page, order, sort, name }: EmbeecardsQueryDTO,
  ) {
    const category = await this.embeecardsRepository.getCategorySpecial();

    if (!category) {
      throw new Error('Category not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.embeecardsRepository.getById(accountId, category.id, {
      page,
      limit: 8,
      order,
      sort,
      name,
    });
  }
}

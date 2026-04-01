import { Injectable } from '@nestjs/common';
import { EmbeecardsQueryDTO } from './dtos/embeecards-query.dto';
import { EmbeecardsRepositoryService } from './embeecards-repository.service';
import { GetEmbeecardResponse } from './models/interfaces/get-embeecard-response.interface';

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

    return this.embeecardsRepository.getById(accountId, category.id, {
      page,
      limit: 8,
      order,
      sort,
      name,
    });
  }

  async findLastCardsByQuantity(
    quantity: number,
    ref: string,
  ): Promise<GetEmbeecardResponse[]> {
    const account = await this.embeecardsRepository.findAccountByRef(ref);
    if (!account) {
      throw new Error('Account not found');
    }

    const cards = await this.embeecardsRepository.findLastCardsByQuantity(
      account.id,
      quantity,
    );

    return cards as unknown as GetEmbeecardResponse[];
  }
}

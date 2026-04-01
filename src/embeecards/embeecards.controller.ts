/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { getLatestCardsAdapter } from './adapters/get-latest-cards.adapter';
import { EmbeecardsQueryDTO } from './dtos/embeecards-query.dto';
import { EmbeecardsService } from './embeecards.service';
import { FilterLastCardsDTO } from './models/dtos/filter-last-cards.dto';
import { GetLastCardsDTO } from './models/dtos/get-last-cards.dto';
import { quantityByPack } from './utils/quantity-by-pack';

@Controller('/v1/embeecards')
export class EmbeecardsController {
  constructor(private readonly embeecardsService: EmbeecardsService) {}

  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string, @Query() query: any) {
    const queryDTO: EmbeecardsQueryDTO = {
      page: Number(query.page) || 1,
      limit: 8,
      order: (query.order || 'rare') as 'rare' | 'date',
      sort: (query.sort || 'desc') as 'asc' | 'desc',
      name: query.name || '',
    };

    try {
      const embeecards = await this.embeecardsService.getById(id, queryDTO);
      return embeecards;
    } catch (error) {
      const err = error as Error;

      throw new HttpException(
        { error: err.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:ref/last')
  @HttpCode(HttpStatus.OK)
  async lastCards(
    @Param() { ref }: GetLastCardsDTO,
    @Query() { sizePack }: FilterLastCardsDTO,
  ) {
    const quantity = quantityByPack(sizePack);
    try {
      const cards = await this.embeecardsService.findLastCardsByQuantity(
        quantity,
        ref,
      );
      return getLatestCardsAdapter(cards);
    } catch {
      throw new HttpException(
        'Error genérico del sistema',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Lck2026Service } from './lck2026.service';
import { GetLastCardsDTO } from './models/dtos/get-last-cards.dto';

@Controller('/v1/lck2026')
export class Lck2026Controller {
  constructor(private readonly lck2026Service: Lck2026Service) {}

  @Get('/users/:id')
  @HttpCode(HttpStatus.OK)
  async getTickets(@Param('id') id: string) {
    try {
      const cards = await this.lck2026Service.getCards(id);

      return { cards };
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
  async lastCards(@Param() { ref }: GetLastCardsDTO) {
    try {
      const cards = await this.lck2026Service.findLastCards(ref);
      return { cards };
    } catch {
      throw new HttpException(
        'Error genérico del sistema',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

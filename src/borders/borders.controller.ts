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
import { BordersService } from './borders.service';
import { BordersQueryDTO } from './dtos/border-query.dto';
import { BorderPaginationEntity } from './entities/border-pagination.entity';

@Controller('/v1/borders')
export class BordersController {
  constructor(private readonly bordersService: BordersService) {}

  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id') id: string,
    @Query() query: any,
  ): Promise<BorderPaginationEntity> {
    try {
      const queryDTO: BordersQueryDTO = {
        page: Number(query.page) || 1,
        limit: 10,
        order: (query.order || 'rank') as 'rank' | 'date',
        sort: (query.sort || 'desc') as 'asc' | 'desc',
        name: query.name || '',
      };

      const borders = await this.bordersService.getById(id, queryDTO);
      return borders;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Error genérico del sistema, vuelva a intentarlo más tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('/v1/tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('/users/:id')
  @HttpCode(HttpStatus.OK)
  async getTickets(@Param('id') id: string) {
    try {
      const tickets = await this.ticketsService.getTickets(id);

      return { tickets };
    } catch (error) {
      const err = error as Error;

      throw new HttpException(
        { error: err.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('/v1/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('/ranking')
  @HttpCode(HttpStatus.OK)
  async ranking() {
    try {
      const ranking = await this.accountsService.getRanking();

      return ranking;
    } catch {
      throw new HttpException(
        'Generic Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:username')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Param('username') username: string) {
    try {
      const user = await this.accountsService.getProfile(username);

      return user;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Error genérico del sistema, vuelva a intentarlo más tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

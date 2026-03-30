import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/v1/accounts')
export class AccountsController {
  @Get('/ranking')
  @HttpCode(HttpStatus.OK)
  ranking() {}
}

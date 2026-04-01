import { TwitchService } from '@/twitch/twitch.service';
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ProfileDTO } from './validations/profile.dto';

@Controller('/v1/accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly twitchService: TwitchService,
  ) {}

  @Get('/ranking')
  @HttpCode(HttpStatus.OK)
  async ranking() {
    try {
      const ranking = await this.accountsService.getRanking();

      return { ranking };
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

  @Get('twitch/following/:username')
  @HttpCode(HttpStatus.OK)
  async getTwitchFollowing(@Param() { username }: ProfileDTO) {
    try {
      const { data } = await this.twitchService.getByUsername(username);
      const { followed_at } = await this.twitchService.getFollowing(data.id);
      return { followedAt: followed_at };
    } catch {
      throw new HttpException(
        'Error genérico del sistema',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

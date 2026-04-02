/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { TwitchUserException } from './exceptions/twitch-user.exception';

export type UserTwitch = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: string;
};

interface TwitchUserReponse {
  data: UserTwitch[];
}

@Injectable()
export class TwitchService {
  private readonly baseUrl = 'https://api.twitch.tv';

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getByUsername(username: string): Promise<{ data: UserTwitch }> {
    const token = this.configService.get<string>('TWITCH_API_TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Client-ID': this.configService.get<string>('TWITCH_CLIENT_ID'),
    };

    const res = await firstValueFrom(
      this.httpService
        .get(`${this.baseUrl}/helix/users?login=${username}`, { headers })
        .pipe(
          map(({ data: { data } }: AxiosResponse<TwitchUserReponse>) => ({
            data: data[0],
          })),
        ),
    );

    if (!res.data) throw new TwitchUserException();

    return res;
  }

  async getByIds(ids: string[]) {
    const token = this.configService.get<string>('TWITCH_API_TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Client-ID': this.configService.get<string>('TWITCH_CLIENT_ID'),
    };

    const params = ids.map((id) => `id=${id}`).join('&');

    const res = await firstValueFrom(
      this.httpService
        .get(`${this.baseUrl}/helix/users?${params}`, { headers })
        .pipe(
          map(({ data: { data } }: AxiosResponse<TwitchUserReponse>) => ({
            data: data,
          })),
        ),
    );

    return res.data;
  }

  async getFollowing(clientId: string) {
    const token = this.configService.get<string>('TWITCH_API_TOKEN');
    const streamerId = this.configService.get<string>('CREATOR_ID');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Client-ID': this.configService.get<string>('TWITCH_CLIENT_ID'),
    };

    const res = await firstValueFrom(
      this.httpService
        .get(
          `${this.baseUrl}/helix/channels/followers?broadcaster_id=${streamerId}&user_id=${clientId}`,
          { headers },
        )
        .pipe(
          map(({ data: { data } }: AxiosResponse<any>) => ({
            data: data,
          })),
        ),
    );

    const data = res.data[0] || { followed_at: null };

    return data as { followed_at: string | null };
  }
}

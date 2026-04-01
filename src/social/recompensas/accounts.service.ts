/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Account } from '@/db/entities/account.entity';
import { Platform } from '@/db/entities/platform.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private readonly accountRepository: Repository<Account>,
    @Inject('PLATFORM_REPOSITORY')
    private readonly platformRepository: Repository<Platform>,
  ) {}

  async getOrCreateAccount(ref: string): Promise<string> {
    const account = await this.accountRepository.findOne({
      where: { ref },
    });

    if (account) {
      return account.id;
    }

    const platform = await this.platformRepository.findOne({
      where: { name: 'TWITCH' },
    });

    if (!platform) {
      throw new Error('Platform TWITCH not found');
    }

    const newAccount = this.accountRepository.create({
      ref,
      platformId: platform.id,
      isStaff: false,
      team: null,
    });

    const savedAccount = await this.accountRepository.save(newAccount);
    return savedAccount.id;
  }

  async addTeam(id: string, team: string): Promise<void> {
    await this.accountRepository.update(id, { team });
  }
}

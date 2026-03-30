import { Inject, Injectable } from '@nestjs/common';
import { Account } from 'src/db/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private AccountRepository: Repository<Account>,
  ) {}

  getRanking() {}
}

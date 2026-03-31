import { Inject, Injectable } from '@nestjs/common';
import { Account } from 'src/db/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsRepositoryService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountRepository: Repository<Account>,
  ) {}

  getRanking() {
    return this.accountRepository
      .createQueryBuilder('account')
      .select('account.id', 'id')
      .addSelect('account.ref', 'ref')
      .addSelect(
        '(SELECT COALESCE(SUM(ab.quantity), 0) FROM account_border ab WHERE ab.account_id = account.id)',
        'totalBorders',
      )
      .addSelect(
        '(SELECT COALESCE(SUM(ae.quantity), 0) FROM account_embeecard ae WHERE ae.account_id = account.id)',
        'totalCards',
      )
      .addSelect(
        '((SELECT COALESCE(SUM(ab.quantity), 0) FROM account_border ab WHERE ab.account_id = account.id) + (SELECT COALESCE(SUM(ae.quantity), 0) FROM account_embeecard ae WHERE ae.account_id = account.id))',
        'total',
      )
      .orderBy('total', 'DESC')
      .limit(8)
      .getRawMany();
  }

  getByRef(ref: string, platformId: string): Promise<Account | null> {
    return this.accountRepository.findOne({
      where: { ref, platformId },
      relations: ['accountBorders', 'accountEmbeecards'],
    });
  }
}

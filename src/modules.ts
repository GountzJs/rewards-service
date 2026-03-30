import { AccountsModule } from './accounts/accounts.module';
import { DBModule } from './db/db.module';
import { SocialModule } from './social/social.module';

export const modules = [DBModule, SocialModule, AccountsModule];

import { DataSource } from 'typeorm';
import { AccountBorder } from './entities/account-border.entity';
import { AccountEmbeecard } from './entities/account-embeecard.entity';
import { AccountLck2026 } from './entities/account-lck2026.entity';
import { AccountSticker } from './entities/account-sticker.entity';
import { AccountTicket } from './entities/account-ticket.entity';
import { Account } from './entities/account.entity';
import { Album } from './entities/album.entity';
import { Border } from './entities/border.entity';
import { Country } from './entities/country.entity';
import { Embeecard } from './entities/embeecard.entity';
import { EmbeecardCategory } from './entities/embeecard_category.entity';
import { Lck2026 } from './entities/lck2026.entity';
import { LolRole } from './entities/lolrole.entity';
import { Platform } from './entities/platform.entity';
import { StickerType } from './entities/sticker-type.entity';
import { Sticker } from './entities/sticker.entity';
import { Team } from './entities/team.entity';
import { Ticket } from './entities/ticket.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.DB_URL,
        entities: [
          AccountBorder,
          AccountEmbeecard,
          AccountSticker,
          AccountTicket,
          AccountLck2026,
          Account,
          Album,
          Border,
          Country,
          EmbeecardCategory,
          Embeecard,
          LolRole,
          Platform,
          StickerType,
          Sticker,
          Team,
          Ticket,
          Lck2026,
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

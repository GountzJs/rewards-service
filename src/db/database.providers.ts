import { DataSource } from 'typeorm';
import { AccountBorder } from './entities/account-border.entity';
import { AccountEmbeecard } from './entities/account-embeecard.entity';
import { AccountSticker } from './entities/account-sticker.entity';
import { AccountTicket } from './entities/account-ticket.entity';
import { Account } from './entities/account.entity';
import { Album } from './entities/album.entity';
import { Border } from './entities/border.entity';
import { Country } from './entities/country.entity';
import { Embeecard } from './entities/embeecard.entity';
import { EmbeecardCategory } from './entities/embeecard_category.entity';
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
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

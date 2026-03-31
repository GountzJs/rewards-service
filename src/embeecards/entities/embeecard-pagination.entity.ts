import { EmbeecardEntity } from './embeecard.entity';

export type EmbeecardPaginationEntity = {
  actualPage: number;
  total: {
    pages: number;
    items: number;
  };
  items: EmbeecardEntity[];
};

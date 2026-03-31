import { BorderEntity } from './border.entity';

export type BorderPaginationEntity = {
  actualPage: number;
  total: {
    pages: number;
    items: number;
  };
  items: BorderEntity[];
};

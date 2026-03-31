export interface BordersQueryDTO {
  page: number;
  limit: number;
  order: 'rank' | 'date';
  sort: 'asc' | 'desc';
  name?: string;
}

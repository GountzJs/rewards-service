export class EmbeecardsQueryDTO {
  page: number;
  limit: number;
  order: 'rare' | 'date';
  sort: 'asc' | 'desc';
  name?: string;
}

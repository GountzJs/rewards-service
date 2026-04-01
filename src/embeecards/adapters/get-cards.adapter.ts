import { GetEmbeecardResponse } from '../models/interfaces/get-embeecard-response.interface';

export const getCardsAdapter = (
  page: number,
  totalPages: number,
  totalItems: number,
  items: GetEmbeecardResponse[],
) => ({
  page,
  total: {
    pages: totalPages,
    items: totalItems,
  },
  data: items.map((accountEmbeecard) => ({
    quantity: accountEmbeecard.quantity,
    name: accountEmbeecard.embeecard.name,
    description: accountEmbeecard.embeecard.description,
    identify: accountEmbeecard.embeecard.identify,
    cover: accountEmbeecard.embeecard.cover,
    category: accountEmbeecard.embeecard.category.name,
  })),
});

import { GetEmbeecardResponse } from '../models/interfaces/get-embeecard-response.interface';

export const getLatestCardsAdapter = (cards: GetEmbeecardResponse[]) => {
  return {
    data: cards.map((card) => {
      return {
        category: card.embeecard.category.name,
        name: card.embeecard.name,
        description: card.embeecard.description,
        cover: card.embeecard.cover,
        identity: card.embeecard.identify,
        isSpecial: card.embeecard.category.name === 'SPECIAL',
        quantity: card.quantity,
      };
    }),
  };
};

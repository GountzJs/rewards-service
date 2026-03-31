export type ProfileDTO = {
  id: string;
  avatar: string;
  username: string;
  team: string | null;
  total: {
    borders: number;
    cards: number;
    general: number;
  };
};

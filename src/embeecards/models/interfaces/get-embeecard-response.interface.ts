export interface GetEmbeecardResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  accountId: string;
  embeecardId: string;
  embeecard: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    identify: string;
    cover: string;
    categoryId: string;
    category: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      name: string;
    };
  };
}

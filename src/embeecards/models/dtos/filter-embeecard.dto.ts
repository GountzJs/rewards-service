/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsOptional, Min } from 'class-validator';

export class FilterEmbeeCardsDTO {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;
}

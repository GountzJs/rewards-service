/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNotEmpty } from 'class-validator';
import { SizePack } from '../enums/size-pack.enum';

export class FilterLastCardsDTO {
  @IsEnum(SizePack)
  @IsNotEmpty()
  sizePack: SizePack;
}

import { SizePack } from '../models/enums/size-pack.enum';

export const quantityByPack = (sizePack: SizePack) => {
  switch (sizePack) {
    case SizePack.Individual:
      return 1;
    case SizePack.SmallPack:
      return 3;
    case SizePack.MediumPack:
      return 6;
    default:
      return 12;
  }
};

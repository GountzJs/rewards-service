import { Injectable } from '@nestjs/common';
import { BordersRepositoryService } from './borders-repository.service';
import { BordersQueryDTO } from './dtos/border-query.dto';
import { BorderPaginationEntity } from './entities/border-pagination.entity';

@Injectable()
export class BordersService {
  constructor(private readonly bordersRepository: BordersRepositoryService) {}

  async getById(
    accountId: string,
    query: BordersQueryDTO,
  ): Promise<BorderPaginationEntity> {
    const borders = await this.bordersRepository.getById(accountId, query);
    return borders;
  }
}

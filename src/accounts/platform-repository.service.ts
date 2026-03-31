/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Platform } from '@/db/entities/platform.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PlatformRepositoryService {
  constructor(
    @Inject('PLATFORM_REPOSITORY')
    private platformRepository: Repository<Platform>,
  ) {}

  getByName(name: string): Promise<Platform | null> {
    return this.platformRepository.findOne({ where: { name } });
  }
}

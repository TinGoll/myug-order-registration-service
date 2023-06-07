import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { HDBK_CACHE_KEY, HdbkService } from '../services/hdbk.service';

@Controller('api/hdbk')
@UseInterceptors(CacheInterceptor)
export class HdbkController {
  constructor(private readonly hdbkService: HdbkService) {}

  @Get()
  @CacheKey(HDBK_CACHE_KEY)
  @CacheTTL(0)
  findAll() {
    return this.hdbkService.findAll();
  }
}

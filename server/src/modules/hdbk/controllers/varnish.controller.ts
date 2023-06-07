import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { VARNISH_CACHE_KEY, VarnishService } from '../services/varnish.service';
import { CreateVarnishInput } from '../inputs/create.varnish.input';
import { UpdateVarnishInput } from '../inputs/update.varnish.input';

@Controller('api/varnishes')
@UseInterceptors(CacheInterceptor)
export class VarnishController {
  constructor(private readonly service: VarnishService) {}

  @Post()
  create(@Body() input: CreateVarnishInput) {
    return this.service.create(input);
  }
  @Patch()
  update(@Body() input: UpdateVarnishInput) {
    return this.service.update(input);
  }
  @Get()
  @CacheKey(VARNISH_CACHE_KEY)
  @CacheTTL(0)
  findAll() {
    return this.service.findAll();
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}

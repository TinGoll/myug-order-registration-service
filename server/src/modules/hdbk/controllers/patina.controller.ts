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
import { PATINA_CACHE_KEY, PatinaService } from '../services/patina.service';
import { CreatePatinaInput } from '../inputs/create.patina.input';
import { UpdatePatinaInput } from '../inputs/update.patina.input';

@Controller('api/patinas')
@UseInterceptors(CacheInterceptor)
export class PatinaController {
  constructor(private readonly service: PatinaService) {}

  @Post()
  create(@Body() input: CreatePatinaInput) {
    return this.service.create(input);
  }
  @Patch()
  update(@Body() input: UpdatePatinaInput) {
    return this.service.update(input);
  }
  @Get()
  @CacheKey(PATINA_CACHE_KEY)
  @CacheTTL(0)
  findAll() {
    return this.service.findAll();
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}

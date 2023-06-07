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
import {
  NOMENCLATURE_CACHE_KEY,
  NomenclatureService,
} from '../services/nomenclature.service';
import { CreateNomenclatureInput } from '../inputs/create.nomenclature.input';
import { UpdateNomenclatureInput } from '../inputs/update.nomenclature.input';

@Controller('api/nomenclatures')
@UseInterceptors(CacheInterceptor)
export class NomenclatureController {
  constructor(private readonly service: NomenclatureService) {}

  @Post()
  create(@Body() input: CreateNomenclatureInput) {
    return this.service.create(input);
  }
  @Patch()
  update(@Body() input: UpdateNomenclatureInput) {
    return this.service.update(input);
  }
  @Get()
  @CacheKey(NOMENCLATURE_CACHE_KEY)
  @CacheTTL(0)
  findAll() {
    return this.service.findAll();
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}

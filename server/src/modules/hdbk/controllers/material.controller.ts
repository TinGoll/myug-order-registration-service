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
  MATERIAL_CACHE_KEY,
  MaterialService,
} from '../services/material.service';
import { CreateMaterialInput } from '../inputs/create.material.input';
import { UpdateMaterialInput } from '../inputs/update.material.input';

@Controller('api/materials')
@UseInterceptors(CacheInterceptor)
export class MaterialController {
  constructor(private readonly service: MaterialService) {}

  @Post()
  create(@Body() input: CreateMaterialInput) {
    return this.service.create(input);
  }
  @Patch()
  update(@Body() input: UpdateMaterialInput) {
    return this.service.update(input);
  }
  @Get()
  @CacheKey(MATERIAL_CACHE_KEY)
  @CacheTTL(0)
  findAll() {
    return this.service.findAll();
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}

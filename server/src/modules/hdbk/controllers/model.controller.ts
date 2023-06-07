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
import { MODELS_CACHE_KEY, ModelService } from '../services/model.service';
import { CreateModelInput } from '../inputs/create.model.input';
import { UpdateModelInput } from '../inputs/update.model.input';


@Controller('api/models')
@UseInterceptors(CacheInterceptor)
export class ModelController {
  constructor(private readonly service: ModelService) {}

  @Post()
  create(@Body() input: CreateModelInput) {
    return this.service.create(input);
  }
  @Patch()
  update(@Body() input: UpdateModelInput) {
    return this.service.update(input);
  }
  @Get()
  @CacheKey(MODELS_CACHE_KEY)
  @CacheTTL(0)
  findAll() {
    return this.service.findAll();
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}

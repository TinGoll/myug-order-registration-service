import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Param,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { COLOR_CACHE_KEY, ColorService } from '../services/color.service';
import { CreateColorInput } from '../inputs/create.color.input';
import { UpdateColorInput } from '../inputs/update.color.input';

@Controller('api/colors')
@UseInterceptors(CacheInterceptor)
export class ColorController {
  constructor(private readonly service: ColorService) {}

  @Post()
  create(@Body() input: CreateColorInput) {
    return this.service.create(input);
  }
  @Patch()
  update(@Body() input: UpdateColorInput) {
    return this.service.update(input);
  }

  @Get()
  @CacheKey(COLOR_CACHE_KEY)
  @CacheTTL(0)
  findAll() {
    return this.service.findAll();
  }
  @Delete(":id")
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}

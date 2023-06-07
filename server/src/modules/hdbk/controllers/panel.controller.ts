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
import { PANELS_CACHE_KEY, PanelService } from '../services/panel.service';
import { CreatePanelInput } from '../inputs/create.panel.input';
import { UpdatePanelInput } from '../inputs/update.panel.input';

@Controller('api/panels')
@UseInterceptors(CacheInterceptor)
export class PanelController {
  constructor(private readonly service: PanelService) {}

  @Post()
  create(@Body() input: CreatePanelInput) {
    return this.service.create(input);
  }
  @Patch()
  update(@Body() input: UpdatePanelInput) {
    return this.service.update(input);
  }
  @Get()
  @CacheKey(PANELS_CACHE_KEY)
  @CacheTTL(0)
  findAll() {
    return this.service.findAll();
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Material } from './entities/material.entity';
import { Model } from './entities/model.entity';
import { Nomenclature } from './entities/nomenclature.entity';
import { Panel } from './entities/panel.entity';
import { Patina } from './entities/patina.entity';
import { Varnish } from './entities/varnish.entity';
import { HdbkService } from './services/hdbk.service';
import { ColorService } from './services/color.service';
import { MaterialService } from './services/material.service';
import { ModelService } from './services/model.service';
import { NomenclatureService } from './services/nomenclature.service';
import { PanelService } from './services/panel.service';
import { PatinaService } from './services/patina.service';
import { VarnishService } from './services/varnish.service';
import { ColorController } from './controllers/color.controller';
import { HdbkController } from './controllers/hdbk.controller';
import { MaterialController } from './controllers/material.controller';
import { ModelController } from './controllers/model.controller';
import { NomenclatureController } from './controllers/nomenclature.controller';
import { PanelController } from './controllers/panel.controller';
import { PatinaController } from './controllers/patina.controller';
import { VarnishController } from './controllers/varnish.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Color,
      Material,
      Model,
      Nomenclature,
      Panel,
      Patina,
      Varnish,
    ]),
  ],
  providers: [
    HdbkService,
    ColorService,
    MaterialService,
    ModelService,
    NomenclatureService,
    PanelService,
    PatinaService,
    VarnishService,
  ],
  controllers: [
    ColorController,
    HdbkController,
    MaterialController,
    ModelController,
    NomenclatureController,
    PanelController,
    PatinaController,
    VarnishController,
  ],
})
export class HdbkModule {}

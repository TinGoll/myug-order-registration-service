import { Injectable } from '@nestjs/common';
import { Observable, forkJoin, map } from 'rxjs';
import OrderTypes from 'src/cammon/types/order-types';
import { NomenclatureService } from './nomenclature.service';
import { ColorService } from './color.service';
import { MaterialService } from './material.service';
import { ModelService } from './model.service';
import { PanelService } from './panel.service';
import { PatinaService } from './patina.service';
import { VarnishService } from './varnish.service';

export const HDBK_CACHE_KEY = 'hdbk';

export interface Hdbk {
  nomenclatures: OrderTypes.Nomenclature[];
  colors: OrderTypes.Color[];
  materials: OrderTypes.Material[];
  models: OrderTypes.FacadeModel[];
  panels: OrderTypes.PanelModel[];
  patinas: OrderTypes.Patina[];
  varnishes: OrderTypes.Varnish[];
}

@Injectable()
export class HdbkService {
  constructor(
    private readonly nomenclatureService: NomenclatureService,
    private readonly colorService: ColorService,
    private readonly materialService: MaterialService,
    private readonly modelService: ModelService,
    private readonly panelService: PanelService,
    private readonly patinaService: PatinaService,
    private readonly varnishService: VarnishService,
  ) {}

  findAll(): Observable<Hdbk> {
    const $nomenclatures = this.nomenclatureService.findAll();
    const $colors = this.colorService.findAll();
    const $materials = this.materialService.findAll();
    const $models = this.modelService.findAll();
    const $panels = this.panelService.findAll();
    const $patinas = this.patinaService.findAll();
    const $varnishes = this.varnishService.findAll();

    return forkJoin([
      $nomenclatures,
      $colors,
      $materials,
      $models,
      $panels,
      $patinas,
      $varnishes,
    ]).pipe(
      map(
        ([
          nomenclatures,
          colors,
          materials,
          models,
          panels,
          patinas,
          varnishes,
        ]) => {
          return {
            nomenclatures,
            colors,
            materials,
            models,
            panels,
            patinas,
            varnishes,
          };
        },
      ),
    );
  }
}

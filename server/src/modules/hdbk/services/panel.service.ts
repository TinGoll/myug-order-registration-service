import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Observable, from, of, switchMap, tap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Panel } from '../entities/panel.entity';
import { CreatePanelInput } from '../inputs/create.panel.input';
import { UpdatePanelInput } from '../inputs/update.panel.input';
import { HDBK_CACHE_KEY } from './hdbk.service';

export const PANELS_CACHE_KEY = 'panels';

@Injectable()
export class PanelService {
  constructor(
    @InjectRepository(Panel)
    private readonly repository: Repository<Panel>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  create(input: CreatePanelInput): Observable<Panel> {
    return this.findByName(input.name).pipe(
      switchMap((entity) => {
        if (entity) {
          throw new HttpException(
            `Элемент с названием "${input.name}" уже существует.`,
            HttpStatus.CONFLICT,
          );
        }
        return from(this.repository.save({ ...input }));
      }),
      tap(() => this.removeCache()),
    );
  }
  update(input: UpdatePanelInput): Observable<any> {
    return from(this.repository.update({ id: input.id }, { ...input })).pipe(
      tap(() => this.removeCache()),
    );
  }
  findAll(): Observable<Panel[]> {
    return from(this.repository.find());
  }
  delete(id: number): Observable<number> {
    return from(this.repository.delete(id)).pipe(
      switchMap(() => of(id)),
      tap(() => this.removeCache()),
    );
  }
  findByName(name: string): Observable<Panel> {
    return from(
      this.repository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name })
        .getOne(),
    );
  }

  private removeCache() {
    this.cacheManager.del(PANELS_CACHE_KEY);
    this.cacheManager.del(HDBK_CACHE_KEY);
  }
}

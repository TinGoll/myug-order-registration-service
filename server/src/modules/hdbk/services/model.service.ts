import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Observable, from, of, switchMap, tap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Model } from '../entities/model.entity';
import { CreateModelInput } from '../inputs/create.model.input';
import { UpdateModelInput } from '../inputs/update.model.input';
import { HDBK_CACHE_KEY } from './hdbk.service';

export const MODELS_CACHE_KEY = 'models';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private readonly repository: Repository<Model>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  create(input: CreateModelInput): Observable<Model> {
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
  update(input: UpdateModelInput): Observable<any> {
    return from(this.repository.update({ id: input.id }, { ...input })).pipe(
      tap(() => this.removeCache()),
    );
  }
  findAll(): Observable<Model[]> {
    return from(this.repository.find());
  }
  delete(id: number): Observable<number> {
    return from(this.repository.delete(id)).pipe(
      switchMap(() => of(id)),
      tap(() => this.removeCache()),
    );
  }
  findByName(name: string): Observable<Model> {
    return from(
      this.repository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name })
        .getOne(),
    );
  }

  private removeCache() {
    this.cacheManager.del(MODELS_CACHE_KEY);
    this.cacheManager.del(HDBK_CACHE_KEY);
  }
}

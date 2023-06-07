import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Observable, from, of, switchMap, tap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Nomenclature } from '../entities/nomenclature.entity';
import { CreateNomenclatureInput } from '../inputs/create.nomenclature.input';
import { UpdateNomenclatureInput } from '../inputs/update.nomenclature.input';
import { HDBK_CACHE_KEY } from './hdbk.service';

export const NOMENCLATURE_CACHE_KEY = 'nomenclatures';

@Injectable()
export class NomenclatureService {
  constructor(
    @InjectRepository(Nomenclature)
    private readonly repository: Repository<Nomenclature>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  create(input: CreateNomenclatureInput): Observable<Nomenclature> {
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
  update(input: UpdateNomenclatureInput): Observable<any> {
    return from(this.repository.update({ id: input.id }, { ...input })).pipe(
      tap(() => this.removeCache()),
    );
  }
  findAll(): Observable<Nomenclature[]> {
    return from(this.repository.find());
  }
  delete(id: number): Observable<number> {
    return from(this.repository.delete(id)).pipe(
      switchMap(() => of(id)),
      tap(() => this.removeCache()),
    );
  }
  findByName(name: string): Observable<Nomenclature> {
    return from(
      this.repository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name })
        .getOne(),
    );
  }

  private removeCache() {
    this.cacheManager.del(NOMENCLATURE_CACHE_KEY);
    this.cacheManager.del(HDBK_CACHE_KEY);
  }
}

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Observable, from, of, switchMap, tap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Varnish } from '../entities/varnish.entity';
import { CreateVarnishInput } from '../inputs/create.varnish.input';
import { UpdateVarnishInput } from '../inputs/update.varnish.input';
import { HDBK_CACHE_KEY } from './hdbk.service';

export const VARNISH_CACHE_KEY = 'varnishes';

@Injectable()
export class VarnishService {
  constructor(
    @InjectRepository(Varnish)
    private readonly repository: Repository<Varnish>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  create(input: CreateVarnishInput): Observable<Varnish> {
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
  update(input: UpdateVarnishInput): Observable<any> {
    return from(this.repository.update({ id: input.id }, { ...input })).pipe(
      tap(() => this.removeCache()),
    );
  }
  findAll(): Observable<Varnish[]> {
    return from(this.repository.find());
  }
  delete(id: number): Observable<number> {
    return from(this.repository.delete(id)).pipe(
      switchMap(() => of(id)),
      tap(() => this.removeCache()),
    );
  }
  findByName(name: string): Observable<Varnish> {
    return from(
      this.repository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name })
        .getOne(),
    );
  }
  private removeCache() {
    this.cacheManager.del(VARNISH_CACHE_KEY);
    this.cacheManager.del(HDBK_CACHE_KEY);
  }
}

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from '../entities/color.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateColorInput } from '../inputs/create.color.input';
import { Observable, from, of, switchMap, tap } from 'rxjs';
import { UpdateColorInput } from '../inputs/update.color.input';
import { HDBK_CACHE_KEY } from './hdbk.service';

export const COLOR_CACHE_KEY = 'colors';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly repository: Repository<Color>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  create(input: CreateColorInput): Observable<Color> {
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
  update(input: UpdateColorInput): Observable<any> {
    return from(this.repository.update({ id: input.id }, { ...input })).pipe(
      tap(() => this.removeCache()),
    );
  }
  findAll(): Observable<Color[]> {
    return from(this.repository.find());
  }
  delete(id: number): Observable<number> {
    return from(this.repository.delete(id)).pipe(
      switchMap(() => of(id)),
      tap(() => this.removeCache()),
    );
  }

  findByName(name: string): Observable<Color | null> {
    return from(
      this.repository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name })
        .getOne(),
    );
  }

  private removeCache() {
    this.cacheManager.del(COLOR_CACHE_KEY);
    this.cacheManager.del(HDBK_CACHE_KEY);
  }
}

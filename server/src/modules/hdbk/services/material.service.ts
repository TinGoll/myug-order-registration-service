import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Material } from '../entities/material.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateMaterialInput } from '../inputs/create.material.input';
import { Observable, from, of, switchMap, tap } from 'rxjs';
import { UpdateMaterialInput } from '../inputs/update.material.input';
import { HDBK_CACHE_KEY } from './hdbk.service';

export const MATERIAL_CACHE_KEY = 'materials';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly repository: Repository<Material>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  create(input: CreateMaterialInput): Observable<Material> {
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
  update(input: UpdateMaterialInput): Observable<any> {
    return from(this.repository.update({ id: input.id }, { ...input })).pipe(
      tap(() => this.removeCache()),
    );
  }
  findAll(): Observable<Material[]> {
    return from(this.repository.find());
  }
  delete(id: number): Observable<number> {
    return from(this.repository.delete(id)).pipe(
      switchMap(() => of(id)),
      tap(() => this.removeCache()),
    );
  }
  findByName(name: string): Observable<Material> {
    return from(
      this.repository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name })
        .getOne(),
    );
  }

  private removeCache() {
    this.cacheManager.del(MATERIAL_CACHE_KEY);
    this.cacheManager.del(HDBK_CACHE_KEY);
  }
}

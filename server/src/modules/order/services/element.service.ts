import { Injectable } from '@nestjs/common';
import { OrderElement } from '../entities/element.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateElementInput } from '../inputs/create.element.input';
import { UpdateElementInput } from '../inputs/update.element.input';
import { Observable, from, of, switchMap } from 'rxjs';

type FindProps = {
  where?: FindOptionsWhere<OrderElement>;
};

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(OrderElement)
    private readonly repository: Repository<OrderElement>,
  ) {}
    /** Создание элемента на основе объекта номенклатуры */
  create(input: CreateElementInput): Observable<OrderElement> {
    const { typeOf, orderBy, id, group, ...data } = input;
    return from(this.repository.save({ ...data, nomenclature: input }));
  }
  /** Обновление элемента */
  update(input: UpdateElementInput): Observable<any> {
    const { id, nomenclature, ...data } = input;
    return from(this.repository.update({ id }, { ...data }));
  }
  /** Сохранение элемента */
  save(entity: OrderElement): Observable<OrderElement> {
    return from(this.repository.save(entity)).pipe(
      switchMap((result) => of(entity)),
    );
  }
  /** Окончательное удаление элемента */
  delete(id: number): Observable<number> {
    return from(this.repository.delete(id)).pipe(switchMap(() => of(id)));
  }
  /** Поиск одного элемента по критерию */
  findOne({ where }: FindProps): Observable<OrderElement> {
    return from(this.repository.findOne({ where }));
  }
}

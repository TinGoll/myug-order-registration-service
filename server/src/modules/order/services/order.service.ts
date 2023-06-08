import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderInput } from '../inputs/create.order.input';
import { UpdateOrderInput } from '../inputs/update.order.input';
import { Observable, from, map, of, switchMap } from 'rxjs';

type FindProps = {
  where?: FindOptionsWhere<Order>;
  relations?: FindOptionsRelations<Order>;
};
type FindManyProps = FindProps & { skip?: number; take: number };

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}
  /** Создать новый заказ */
  create(input: CreateOrderInput): Observable<Order> {
    const {
      id,
      author,
      client,
      manager,
      deleted,
      updatedAt,
      createdAt,
      ...data
    } = input;
    return from(this.repository.save({ ...data }));
  }

  /** Обовление/изменение полей заказа */
  update(input: UpdateOrderInput): Observable<any> {
    const {
      id,
      author,
      client,
      manager,
      updatedAt,
      createdAt,
      clientNumner,
      ...data
    } = input;
    return from(this.repository.update({ id }, { ...data }));
  }
  /** Окончательное удаление заказа */
  delete(id: number): Observable<number> {
    return from(this.repository.delete(id)).pipe(map(() => id));
  }

  /** Сохранить заказ */
  save(entity: Order): Observable<Order> {
    return from(this.repository.save(entity)).pipe(
      switchMap((result) => of(entity)),
    );
  }

  /** Получить один заказ */
  findOne({ where, relations }: FindProps): Observable<Order> {
    return from(this.repository.findOne({ where, relations }));
  }

  /** Получить несколько заказов */
  findAll({
    where,
    relations,
    skip,
    take,
  }: FindManyProps): Observable<Order[]> {
    return from(
      this.repository.find({
        where,
        relations,
        skip,
        take,
      }),
    );
  }

  /** Фиктивное удаление заказа, с возможностью восстановления */
  remove(entity: number | Order): Observable<number | null> {
    if (typeof entity === 'number') {
      return from(this.findOne({ where: { id: entity } })).pipe(
        switchMap((order) => {
          if (order) {
            return this.update({ id: order.id, deleted: true });
          }
          return of(null);
        }),
      );
    }
    return this.update({ id: entity.id, deleted: true }).pipe(
      map(() => entity.id),
    );
  }
}

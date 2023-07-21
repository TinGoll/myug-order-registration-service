import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { DocumentService } from '../services/document.service';
import { ElementService } from '../services/element.service';
import OrderTypes from 'src/cammon/types/order-types';
import { Observable, concatMap, forkJoin, map, of, switchMap } from 'rxjs';
import { OrderProcessing } from 'src/modules/order-processing/order-processing';
import { OrderState } from '../enums/order-state.enum';
import { Person } from 'src/cammon/types/app-types';
import { Role } from 'src/modules/auth/roles.enum';

@Injectable()
export class OrderCreator {
  constructor(
    private readonly orderService: OrderService,
    private readonly documentService: DocumentService,
    private readonly elementService: ElementService,
    private readonly orderProcessing: OrderProcessing,
  ) {}

  /** Одноразовая обработка заказа с сохранием и возвратом данных */
  once(order: OrderTypes.Order): Observable<OrderTypes.Order> {
    return this.orderProcessing
      .once(order)
      .pipe(switchMap((processedOrder) => this.saveOrder(processedOrder)));
  }

  saveOrder(order: OrderTypes.Order): Observable<OrderTypes.Order> {
    return this.orderService.save(order).pipe(
      concatMap((savedOrder) => {
        const documents = savedOrder.documents || [];
        const documentObservables = documents.map((document) => {
          document.order = savedOrder;
          return this.documentService.save(document).pipe(
            map((savedDocument) => {
              delete savedDocument['order'];
              return savedDocument;
            }),
          );
        });
        if (documentObservables.length === 0) {
          return of(savedOrder);
        }
        return forkJoin(documentObservables).pipe(
          concatMap((savedDocuments) => {
            const elementObservables: Observable<OrderTypes.Element>[] = [];
            savedDocuments.forEach((savedDocument) => {
              const elements = savedDocument.elements || [];
              const elementObservablesForDocument = elements.map((element) => {
                element.document = savedDocument;
                return this.elementService.save(element).pipe(
                  map((savedElement) => {
                    delete savedElement['document'];
                    return savedElement;
                  }),
                );
              });
              elementObservables.push(...elementObservablesForDocument);
            });
            if (elementObservables.length === 0) {
              return of(savedOrder);
            }
            return forkJoin(elementObservables).pipe(map(() => savedOrder));
          }),
        );
      }),
    );
  }

  removeOrder(id: number) {
    return this.orderService.remove(id);
  }

  deleteOrder(id: number) {
    return this.orderService.delete(id);
  }

  getOrders() {
    return this.orderService.findAll();
  }

  setState(id: number, state: OrderState, user: Person) {
    return this.orderService.findOne({ where: { id } }).pipe(
      switchMap((order) => {
        if (!order) {
          throw new HttpException(
            `Заказ не найден в базе данных.`,
            HttpStatus.NOT_FOUND,
          );
        }

        if (user.role !== Role.ADMIN && user.login !== order.author?.login) {
          throw new HttpException(
            `У Вас нет прав для редактирования этого заказа.`,
            HttpStatus.FORBIDDEN,
          );
        }

        if (order.state === OrderState.UNDER_CONFIRMATION) {
          throw new HttpException(
            `Заказ находится в подтвержденном состоянии, изменение невозможно.`,
            HttpStatus.FORBIDDEN,
          );
        }

        return this.orderService
          .setState(id, state)
          .pipe(map(() => ({ state })));
      }),
    );
  }
}

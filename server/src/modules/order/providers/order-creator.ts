import { Injectable } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { DocumentService } from '../services/document.service';
import { ElementService } from '../services/element.service';
import OrderTypes from 'src/cammon/types/order-types';
import { Observable, concatMap, forkJoin, map, of } from 'rxjs';

@Injectable()
export class OrderCreator {
  constructor(
    private readonly orderService: OrderService,
    private readonly documentService: DocumentService,
    private readonly elementService: ElementService,
  ) {}

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
}

import { Injectable } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { DocumentService } from '../services/document.service';
import { ElementService } from '../services/element.service';

@Injectable()
export class OrderCreator {
  constructor(
    private readonly orderService: OrderService,
    private readonly documentService: DocumentService,
    private readonly elementService: ElementService,
  ) {}
}

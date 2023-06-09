import { Injectable } from '@nestjs/common';
import { OrderDocument } from '../entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { CreateDocumentInput } from '../inputs/create.document.input';
import { UpdateDocumentInput } from '../inputs/update.document.input';
import { Observable, from, map } from 'rxjs';

type FindProps = {
  where?: FindOptionsWhere<OrderDocument>;
  relations?: FindOptionsRelations<OrderDocument>;
};

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(OrderDocument)
    private readonly repository: Repository<OrderDocument>,
  ) {}

  create(input: CreateDocumentInput): Observable<OrderDocument> {
    const { id, elements, deleted, order, updatedAt, createdAt, ...data } =
      input;
    return from(this.repository.save({ ...data }));
  }
  update(input: UpdateDocumentInput): Observable<any> {
    const { id, createdAt, updatedAt, elements, order, ...data } = input;
    return from(this.repository.update({ id }, { ...data }));
  }

  findOne({ where, relations }: FindProps): Observable<OrderDocument> {
    return from(this.repository.findOne({ where, relations }));
  }

  findAll({ where, relations }: FindProps): Observable<OrderDocument[]> {
    return from(this.repository.find({ where, relations }));
  }

  delete(id: number) {
    return from(this.repository.delete(id)).pipe(map(() => id));
  }
  remove(entity: number | OrderDocument) {
    if (typeof entity === 'number') {
      return;
    }
  }
  save(entity: OrderDocument) {
    return from(this.repository.save(entity));
  }
}

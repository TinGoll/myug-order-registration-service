import { Observable } from 'rxjs';

export interface HdbkServiceInterface<T> {
  create(input: unknown): Observable<T>;
  update(input: unknown): Observable<any>;
  findAll(): Observable<T[]>;
  delete(id: number): Observable<number>;
  findByName(name: string): Observable<T | null>;
}

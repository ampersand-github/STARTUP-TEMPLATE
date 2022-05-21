import { BookId } from 'src/domain/book/book-id/book-id';
import { Borrow } from '../borrow';

export interface IBorrowRepository {
  findOne(id: BookId): Promise<Borrow | null>;
  findAll(): Promise<Borrow[]>;
  save(entity: Borrow): Promise<void>;
}

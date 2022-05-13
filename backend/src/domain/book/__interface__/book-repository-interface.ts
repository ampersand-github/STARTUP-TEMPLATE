import { Book } from 'src/domain/book/book';
import { BookId } from 'src/domain/book/book-id/book-id';

export interface IBookRepository {
  findAll(): Promise<Book[]>;
  findOne(id: BookId): Promise<Book | null>;
  // register(entity: Borrow): Promise<void>;
  // update(entity: Borrow): Promise<void>;
  // delete(id: BookId): Promise<void>;
}

import { Book } from 'src/domain/book/book';
import { BookId } from 'src/domain/book/book-id/book-id';

export interface IBookRepository {
  findOne(id: BookId): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  register(entity: Book): Promise<void>;
  // update(entity: Borrow): Promise<void>;
  // delete(id: BookId): Promise<void>;
}

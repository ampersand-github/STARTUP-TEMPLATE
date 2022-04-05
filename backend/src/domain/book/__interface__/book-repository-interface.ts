import { Book } from 'src/domain/book/book';
import { BookId } from 'src/domain/book/book-id';

export interface IBookRepository {
  findAll(): Promise<Book[]>;
  findOne(id: BookId): Promise<Book | null>;
  // register(entity: Book): Promise<void>;
  // update(entity: Book): Promise<void>;
  // delete(id: BookId): Promise<void>;
}

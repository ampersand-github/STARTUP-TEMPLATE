import { Book } from 'src/domain/book/book';
import { BookId } from 'src/domain/book/book-id/book-id';

export interface IBookRepository {
  findOne(id: BookId): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  save(entity: Book): Promise<void>;
}

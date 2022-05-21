import { BookId } from '../../../domain/book/book-id/book-id';
import { Book } from '../../../domain/book/book';
import { Borrow } from '../../../domain/borrow/borrow';

export interface IBookWithBorrow {
  book: Book;
  borrow: Borrow;
}
export interface IBookWithBorrowQS {
  findOne(id: BookId): Promise<IBookWithBorrow | null>;
  findAll(): Promise<IBookWithBorrow[]>;
}

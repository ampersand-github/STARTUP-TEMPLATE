import { Book } from 'src/domain/book/book';
import { Borrow } from 'src/domain/book/borrower/_borrow/borrow';
import { OpenBookId } from 'src/domain/open-book/open-book-id/open-book-id';

export interface IOpenBookOA {
  id: OpenBookId;
  book: Book;
  borrowing: Borrow | undefined;
}

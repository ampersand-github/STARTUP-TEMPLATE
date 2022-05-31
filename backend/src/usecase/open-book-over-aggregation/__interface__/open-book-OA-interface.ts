import { Book } from '../../../domain/book/book';
import { Borrow } from '../../../domain/borrow/borrow';
import { OpenBookId } from '../../../domain/open-book/open-book-id/open-book-id';

export interface IOpenBookOA {
  id: OpenBookId;
  book: Book;
  borrowing: Borrow | undefined;
}

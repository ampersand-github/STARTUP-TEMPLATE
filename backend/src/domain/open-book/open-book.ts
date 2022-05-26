import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { BookId } from '../book/book-id/book-id';
import { BorrowId } from '../borrow/borrow-id/borrow-id';
import { OpenBookId } from './open-book-id/open-book-id';

export interface IOpenBook {
  bookId: BookId;
  borrowingId: BorrowId | undefined;
}

export class OpenBook extends AggregateRoot<IOpenBook, OpenBookId> {
  private readonly bookId: BookId;
  private readonly borrowingId: BorrowId;

  public getBookId() {
    return this.bookId;
  }

  public getBorrowingId() {
    return this.borrowingId;
  }

  private constructor(props: IOpenBook, id: OpenBookId) {
    super(props, id);
    this.bookId = props.bookId;
    this.borrowingId = props.borrowingId;
  }

  public static create(props: IOpenBook): OpenBook {
    return new OpenBook(props, OpenBookId.create());
  }

  public static reBuild(props: IOpenBook, id: OpenBookId): OpenBook {
    return new OpenBook(props, id);
  }

  public idBorrowing() {
    return !!this.borrowingId;
  }
}

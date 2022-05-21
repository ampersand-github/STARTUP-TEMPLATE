import { AggregateRoot } from '../__shared__/aggregate-root';
import { BookId } from '../book/book-id/book-id';
import { UserId } from '../user/user-id/user-id';
import { BorrowId } from './borrow-id/borrow-id';

export interface IBorrow {
  bookId: BookId;
  userId: UserId;
  startAt: Date;
  endAt: Date | undefined;
}

export class Borrow extends AggregateRoot<IBorrow, BorrowId> {
  private readonly bookId: BookId;
  private readonly userId: UserId;
  private readonly startAt: Date;
  private readonly endAt: Date | undefined;

  public getBookId() {
    return this.bookId;
  }

  public getUserId() {
    return this.userId;
  }

  public getStartAt() {
    return this.startAt;
  }

  public getEndAt() {
    return this.endAt;
  }

  private constructor(props: IBorrow, id: BorrowId) {
    super(props, id);
    this.bookId = props.bookId;
    this.userId = props.userId;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
  }

  public static create(props: IBorrow): Borrow {
    return new Borrow(props, BorrowId.create());
  }

  public static reBuild(props: IBorrow, id: BorrowId): Borrow {
    return new Borrow(props, id);
  }

  public isBorrowing() {
    return !this.endAt;
  }

  public returnBook(): Borrow {
    if (this.endAt) throw new Error('この書籍は返却済みです');

    return Borrow.reBuild(
      {
        bookId: this.bookId,
        userId: this.userId,
        startAt: this.startAt,
        endAt: new Date(),
      },
      this.id,
    );
  }
}

import { ValueObject } from '../../__shared__/value-object';
import { UserId } from '../../user/user-id';
import { BookId } from '../book-id/book-id';

export interface IBorrow {
  bookId: BookId;
  userId: UserId;
  startAt: Date;
  endAt?: Date;
}

export class Borrow extends ValueObject<IBorrow> {
  private readonly bookId: BookId;
  private readonly userId: UserId;
  private readonly startAt: Date;
  private readonly endAt?: Date;

  public constructor(props: IBorrow) {
    super(props);
    this.bookId = props.bookId;
    this.userId = props.userId;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
  }

  public canBorrow(): boolean {
    // this.endAt ? false:true と同じ
    return !this.endAt;
  }

  public returnBook() {
    if (this.endAt) throw new Error('返却済みです。');
    const props: IBorrow = {
      bookId: this.bookId,
      userId: this.userId,
      startAt: this.startAt,
      endAt: new Date(),
    };
    return new Borrow(props);
  }
}

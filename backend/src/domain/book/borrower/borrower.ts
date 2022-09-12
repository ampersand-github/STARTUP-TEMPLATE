import { UserId } from '../../user/user-id/user-id';
import { BookId } from '../book-id/book-id';
import { ValueObject } from '../../__shared__/value-object';

export interface IBorrower {
  userId: UserId;
  bookId: BookId;
  startAt: Date;
  returnAt?: Date;
  scheduledReturnAt?: Date;
}

export class Borrower extends ValueObject<IBorrower> {
  public readonly userId: IBorrower['userId'];
  public readonly bookId: IBorrower['bookId'];
  public readonly startAt: IBorrower['startAt'];
  public readonly returnAt: IBorrower['returnAt'];
  public readonly scheduledReturnAt: IBorrower['scheduledReturnAt'];

  public constructor(props: IBorrower) {
    super(props);
    this.userId = props.userId;
    this.bookId = props.bookId;
    this.startAt = props.startAt;
    this.returnAt = props.returnAt;
    this.scheduledReturnAt = props.scheduledReturnAt;
  }
}

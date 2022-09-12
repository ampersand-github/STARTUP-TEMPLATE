import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { UserId } from '../../user/user-id/user-id';
import { BookId } from "../book-id/book-id";
import { BorrowerId } from "./borrower-id/borrower-id";

export interface IBorrower {
  userId: UserId;
  bookId:BookId;
  startAt: Date;
  returnAt?: Date;
  scheduledReturnAt?:Date;
}

export class Borrower extends AggregateRoot<IBorrower, BorrowerId> {
  public readonly userId: IBorrower["userId"];
  public readonly bookId:IBorrower["bookId"];
  public readonly startAt: IBorrower["startAt"];
  public readonly returnAt: IBorrower["returnAt"];
  public readonly scheduledReturnAt: IBorrower["scheduledReturnAt"];

  private constructor(props: IBorrower, id: BorrowerId) {
    super(props, id);
    this.userId = props.userId;
    this.bookId = props.bookId;
    this.startAt = props.startAt;
    this.returnAt = props.returnAt;
    this.scheduledReturnAt = props.scheduledReturnAt;
  }

  public static create(props: IBorrower): Borrower {
    return new Borrower(props, BorrowerId.create());
  }

  public static reBuild(props: IBorrower, id: BorrowerId): Borrower {
    return new Borrower(props, id);
  }

}

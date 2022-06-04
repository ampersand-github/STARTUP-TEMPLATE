import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { UserId } from '../user/user-id/user-id';
import { BorrowId } from './borrow-id/borrow-id';
import { OpenBookId } from '../open-book/open-book-id/open-book-id';

export interface IBorrow {
  openBookId: OpenBookId;
  userId: UserId;
  startAt: Date;
  endAt: Date | undefined;
}

export class Borrow extends AggregateRoot<IBorrow, BorrowId> {
  private readonly openBookId: OpenBookId;
  private readonly userId: UserId;
  private readonly startAt: Date;
  private readonly endAt: Date | undefined;

  public getOpenBookId() {
    return this.openBookId;
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
    this.openBookId = props.openBookId;
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
}

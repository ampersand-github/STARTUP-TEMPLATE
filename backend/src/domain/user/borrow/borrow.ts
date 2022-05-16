import { UserId } from '../user-id/user-id';
import { BookId } from '../../book/book-id/book-id';
import { Entity } from '../../__shared__/entity';
import { BorrowId } from './borrow-id';
import { IBook } from '../../book/book';

export interface IBorrow {
  bookId: BookId;
  userId: UserId;
  startAt: Date;
  endAt: Date | undefined;
}

export class Borrow extends Entity<IBorrow, BorrowId> {
  private readonly bookId: BookId;
  private readonly userId: UserId;
  private readonly startAt: Date;
  private readonly endAt: Date | undefined;

  // - - - - - - - - - - - - - - - - - - - - - - - - -
  // このドメインオブジェクトは利用者集約に属するテーブルから習得している。
  // そのため書籍集約から更新がかけられないようにgetterは公開しない
  // - - - - - - - - - - - - - - - - - - - - - - - - -

  public constructor(props: IBorrow, id: BorrowId) {
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

  public canBorrow(): boolean {
    // this.endAt ? false:true と同じ
    return !this.endAt;
  }
}

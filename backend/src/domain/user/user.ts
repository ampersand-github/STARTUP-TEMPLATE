import { UserId } from 'src/domain/user/user-id/user-id';
import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { BorrowingList } from './borrow-list/borrow-list';

export interface IUser {
  name: string;
  borrowingList: BorrowingList;
}

export class User extends AggregateRoot<IUser, UserId> {
  private readonly name: string;
  private readonly borrowingList: BorrowingList;

  public getName() {
    return this.name;
  }

  public getBorrowingList() {
    return this.borrowingList;
  }

  private constructor(props: IUser, id: UserId) {
    super(props, id);
    this.name = props.name;
    this.borrowingList = props.borrowingList;
  }

  public static create(props: IUser): User {
    return new User(props, UserId.create());
  }

  public static reBuild(props: IUser, id: UserId): User {
    return new User(props, id);
  }
}

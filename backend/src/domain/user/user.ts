import { UserId } from 'src/domain/user/user-id/user-id';
import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';

export interface IUser {
  name: string;
}

export class User extends AggregateRoot<IUser, UserId> {
  private readonly name: string;

  public getName() {
    return this.name;
  }

  private constructor(props: IUser, id: UserId) {
    super(props, id);
    this.name = props.name;
  }

  public static create(props: IUser): User {
    return new User(props, UserId.create());
  }

  public static reBuild(props: IUser, id: UserId): User {
    return new User(props, id);
  }
}

import { UserId } from 'src/domain/user/user-id/user-id';
import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';

export interface IUser {
  name: string;
  tel:string;
}

export class User extends AggregateRoot<IUser, UserId> {
  public readonly name: string;
  public readonly tel:string;

  private constructor(props: IUser, id: UserId) {
    super(props, id);
    this.name = props.name;
    this.tel = props.tel
  }

  public static construct(props: IUser): User {
    return new User(props, UserId.construct());
  }

  public static reConstruct(props: IUser, id: UserId): User {
    return new User(props, id);
  }
}

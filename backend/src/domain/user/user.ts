import { UserId } from 'src/domain/user/user-id';
import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { Email } from 'src/domain/user/email';

export interface IUser {
  name: string;
  email: Email;
}

export class User extends AggregateRoot<IUser, UserId> {
  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email.value;
  }

  /*
  public get tags():string[] {
    return this.props.tags;
  }
 */

  public static create(props: IUser): User {
    return new User(props, UserId.create());
  }

  public static reBuild(props: IUser, id: UserId): User {
    return new User(props, id);
  }
}

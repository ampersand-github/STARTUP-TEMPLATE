import { UserId } from 'src/domain/user/user-id/user-id';
import { AggregateRoot } from 'src/domain/__shared__/aggregate-root';
import { StripeCustomerId } from './stripe-customer-id/stripe-customer-id';

export interface IUser {
  stripeCustomerId?: StripeCustomerId;
  name: string;
  tel: string;
}

export class User extends AggregateRoot<IUser, UserId> {
  public readonly stripeCustomerId: IUser['stripeCustomerId'];
  public readonly name: IUser['name'];
  public readonly tel: IUser['tel'];

  private constructor(props: IUser, id: UserId) {
    super(props, id);
    this.stripeCustomerId = props.stripeCustomerId;
    this.name = props.name;
    this.tel = props.tel;
  }

  public static construct(props: IUser): User {
    return new User(props, UserId.construct());
  }

  public static reConstruct(props: IUser, id: UserId): User {
    return new User(props, id);
  }
}

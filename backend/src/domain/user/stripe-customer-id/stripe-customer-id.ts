import { v4 as uuid } from 'uuid';
import { UniqueEntityId } from 'src/domain/__shared__/unique-entity-id';

export class StripeCustomerId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, 'StripeCustomerId');
  }

  public static construct(): StripeCustomerId {
    return new StripeCustomerId(uuid());
  }

  public static reConstruct(value: string): StripeCustomerId {
    return new StripeCustomerId(value);
  }
}

import { v4 as uuid } from 'uuid';
import { UniqueEntityId } from '../../__shared__/unique-entity-id';

export class StripeCustomerId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, 'StripeCustomerId');
  }

  public static create(): StripeCustomerId {
    return new StripeCustomerId(uuid());
  }

  public static reBuild(value: string): StripeCustomerId {
    return new StripeCustomerId(value);
  }
}

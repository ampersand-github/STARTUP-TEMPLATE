import { UserId } from '../user-id/user-id';
import { faker } from '@faker-js/faker';
import { User } from '../user';
import { StripeCustomerId } from '../stripe-customer-id/stripe-customer-id';

export const createTestUser = (
  userId: UserId = UserId.construct(),
  stripeCustomerId: StripeCustomerId = StripeCustomerId.construct(),
  name: string = faker.name.fullName(),
  tel: string = faker.phone.number(),
): User => {
  return User.reConstruct(
    {
      stripeCustomerId: stripeCustomerId,
      name: name,
      tel: tel,
    },
    userId,
  );
};

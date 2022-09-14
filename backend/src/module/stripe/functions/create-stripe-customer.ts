import { UserId } from 'src/domain/user/user-id/user-id';
import { Stripe } from 'stripe';

export interface ICreateStripeCustomer {
  userId: UserId;
  email: string;
  stripe: Stripe;
}

export const createStripeCustomer = async (props: ICreateStripeCustomer) => {
  const newCustomer: Stripe.Customer = await props.stripe.customers.create({
    email: props.email,
    metadata: {
      uuid: props.userId.toString(),
    },
  });
  return newCustomer.id.toString();
};

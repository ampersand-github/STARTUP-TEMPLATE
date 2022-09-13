// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// StripeCustomerとメールアドレスを同期する
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { Stripe } from 'stripe';

export interface ISyncEmailToStripeCustomer {
  stripeCustomerId: string;
  email: string;
  stripe: Stripe;
}

export const syncEmailToStripeCustomer = async (
  props: ISyncEmailToStripeCustomer,
) => {
  await props.stripe.customers.update(props.stripeCustomerId, {
    email: props.email,
  });
};

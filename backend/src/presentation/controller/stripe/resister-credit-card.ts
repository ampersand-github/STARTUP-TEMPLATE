import { Stripe } from 'stripe';

export interface IResisterCreditCard {
  stripe: Stripe;
  customerId: string;
  successUrl: string;
  cancelUrl: string;
}

export const resisterCreditCard = async (props: IResisterCreditCard) => {
  const checkoutSession = await props.stripe.checkout.sessions.create({
    mode: 'setup',
    success_url: props.successUrl,
    cancel_url: props.cancelUrl,
    payment_method_types: ['card'],
    customer: props.customerId,
  });
  return {
    session_id: checkoutSession.id,
    checkout_url: checkoutSession.url,
    customer_id: props.customerId,
  };
};

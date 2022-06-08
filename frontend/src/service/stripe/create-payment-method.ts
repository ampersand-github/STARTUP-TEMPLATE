import { PaymentMethodResult } from '@stripe/stripe-js/types/stripe-js/stripe';
import * as stripeJs from '@stripe/stripe-js';
import { StripeCardElement, StripeElements } from '@stripe/stripe-js';

export interface ICreatePaymentMethod {
  stripe: stripeJs.Stripe;
  cardElement: StripeCardElement;
}

export const createPaymentMethod = async (
  props: ICreatePaymentMethod,
): Promise<PaymentMethodResult> => {
  return await props.stripe.createPaymentMethod({
    type: 'card',
    card: props.cardElement,
  });
};

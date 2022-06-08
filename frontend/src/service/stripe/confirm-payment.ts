import { StripeError } from '@stripe/stripe-js/types/stripe-js/stripe';
import * as stripeJs from '@stripe/stripe-js';
import { StripeElements } from '@stripe/stripe-js';

export interface IconfirmPayment {
  stripe: stripeJs.Stripe;
  elements: StripeElements;
}

export const confirmPayment = async (
  props: IconfirmPayment,
): Promise<StripeError> => {
  const { error } = await props.stripe.confirmPayment({
    elements: props.elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: 'http://localhost:3000',
      shipping: {
        name: 'name',
        address: {
          line1: '',
          postal_code: '1540043',
        },
      },
      payment_method_data: {
        billing_details: {
          address: {
            country: 'JP',
          },
        },
      },
    },
  });
  return error;
};

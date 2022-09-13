import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useCustomSnackbar } from 'src/service/notification/use-custom-snackbar';
import React, { useState } from 'react';
import { confirmPayment } from 'src/service/stripe/confirm-payment';
import * as stripeJs from '@stripe/stripe-js';
import { PurchaseButton } from './purchase-button';

export const PurchaseBody = (): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements(); // <Elements>の中でないと宣言できない
  const customSnackbar = useCustomSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [cardInputComplete, setCardInputComplete] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    //
    // 支払う エラーがなければsuccessページへ遷移
    const error = await confirmPayment({ stripe, elements });
    if (error) customSnackbar({ message: error.message, variant: 'error' });
    //
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement
        id="payment-element"
        onChange={(event: stripeJs.StripePaymentElementChangeEvent) =>
          setCardInputComplete(event.complete)
        }
      />
      <PurchaseButton
        cardInputComplete={cardInputComplete}
        isLoading={isLoading}
        stripeLoading={!!stripe}
        elementLoading={!!elements}
        onClick={handleSubmit}
      />
    </form>
  );
};

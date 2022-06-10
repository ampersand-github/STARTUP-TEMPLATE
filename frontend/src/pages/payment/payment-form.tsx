import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCustomSnackbar } from 'src/service/notification/use-custom-snackbar';
import {
  getPaymentProduct,
  IPaymentProduct,
} from 'src/service/stripe/get-payment-product';
import { takeOutFromUrlQuery } from 'src/service/stripe/take-out-from-url-query';
import * as stripeJs from '@stripe/stripe-js';
import { Box, Button } from '@mui/material';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { stripePromise } from 'src/pages/_app';
import { confirmPayment } from 'src/service/stripe/confirm-payment';
import { LoadingButton } from '@mui/lab';

// https://stripe.com/docs/payments/quickstart
const PaymentForm: NextPage = () => {
  const { back, query } = useRouter();
  const customSnackbar = useCustomSnackbar();
  const [paymentProduct, setPaymentProduct] = useState<IPaymentProduct>();

  useEffect(() => {
    /*
        urlからidを抽出
    */
    const cleanUp = async () => {
      const result = takeOutFromUrlQuery(query.productId);
      if (result.errorMessage) {
        customSnackbar({ message: '商品IDが不正です', variant: 'error' });
        back();
        return; // ここで処理を終わらせる
      }
      /*
        バックエンドからproductを取得
      */
      const pp = await getPaymentProduct(result.target as string);
      try {
        setPaymentProduct({
          clientSecret: pp.clientSecret,
          image: pp.image,
          name: pp.name,
          price: pp.price,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          customSnackbar({ message: err.toString(), variant: 'error' });
          back();
        }
        throw err;
      }
    };
    cleanUp();
  }, []);

  const options: stripeJs.StripeElementsOptions = {
    clientSecret: paymentProduct?.clientSecret,
    appearance: { theme: 'stripe' },
  };

  return (
    <Box>
      {paymentProduct?.clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentFormChild paymentProduct={paymentProduct} />
        </Elements>
      )}
    </Box>
  );
};

export default PaymentForm;

interface IPaymentFormChild {
  paymentProduct: IPaymentProduct;
}

const PaymentFormChild = (props: IPaymentFormChild): JSX.Element => {
  const stripe = useStripe();
  const elements = useElements();
  const customSnackbar = useCustomSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [cardInputComplete, setCardInputComplete] = useState(false);

  const handleSubmit = async (e:any) => {
    console.log('ssss');
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    //
    // 支払う
    const error = await confirmPayment({ stripe, elements });
    if (error) customSnackbar({ message: error.message, variant: 'error' });

    setIsLoading(false);
  };

  const stateChangedButton = () => {
    // 以下の(条件)の場合、条件を満たす場合true
    // !で否定なので、!(条件)の場合、条件を満たす場合false
    const disable = () =>
      !(cardInputComplete && !isLoading && stripe && elements);

    return isLoading ? (
      <LoadingButton loading>購入する</LoadingButton>
    ) : (
      <Button onClick={handleSubmit} disabled={disable()}>
        購入する
      </Button>
    );
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <p>{props.paymentProduct.clientSecret}</p>
      <p>{props.paymentProduct.name}</p>
      <p>{props.paymentProduct.price}</p>
      <img width={240} src={props.paymentProduct.image} alt={''} />
      <p>住所入力欄</p>
      <PaymentElement
        onChange={(event) => setCardInputComplete(event.complete)}
        id="payment-element"
      />
      {stateChangedButton()}
    </form>
  );
};

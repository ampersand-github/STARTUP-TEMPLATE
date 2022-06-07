import { NextPage } from 'next';
import React, { useLayoutEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { axiosConfig } from 'src/service/axios-config';
import { Button, Container, Typography } from '@mui/material';
import { GoToCreditCardResisterFormButton } from 'src/component/organism/stripe/go-to-credit-card-resister-form';
import { useAuthContext } from 'src/service/auth/auth-context';
import { CenterLoading } from 'src/component/atom/center-loading';
import { useRouter } from 'next/router';
import { useAuthBlocker } from 'src/service/auth/use-auth-block';
import { PaymentForm } from 'src/component/organism/stripe/payment-form';
import { loadStripe } from '@stripe/stripe-js';
import { Elements as StripeElements } from '@stripe/react-stripe-js';

interface IPayment {
  accountId: string;
  email: string;
}

const Payment: NextPage<IPayment> = (props: IPayment) => {
  const { back, push } = useRouter();
  const [notLoginEdBlocker, notVerifiedBlocker] = useAuthBlocker(back);
  const [stripeCustomerId, setStripeCustomerId] = useState('');
  const { currentUser } = useAuthContext();
  const [isLoading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  // loadScriptでstripeのスクリプトを呼び出す
  console.log(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
  const promise = loadStripe(
    'pk_test_51KuwaMKUmqwUU5F8Wuv0yPt0uSsfoAGL8iRnLNcVnAVBuXMHBkDJ4vBMo0pRjSavwhzj1cJLkwS5HJndHtZInhCR00oSDGRWvX',
  );

  useLayoutEffect(() => {
    const cleanUp = async () => {
      if (currentUser === undefined) return <CenterLoading />;
      await notLoginEdBlocker();
      await notVerifiedBlocker();
      if (currentUser?.type === 'verified') {
        await getStripeCustomerId();
        await forPaymentClientSecret('');
        setLoading(false);
      }
    };
    cleanUp();
  }, [currentUser]);

  const getStripeCustomerId = async () => {
    const url = `/stripe/customer/${props.accountId}`;
    const result = await axios.post(url, props, await axiosConfig());
    setStripeCustomerId(result.data);
  };

  const forPaymentClientSecret = async (accountId: string) => {
    const url = `/stripe/payment`;
    const result2 = await axios.post(
      url,
      { accountId: props.accountId },
      await axiosConfig(),
    );
    // todo エラーハンドリング
    console.log('setClientSecret');
    console.log(result2.data);
    setClientSecret(result2.data);
  };

  const pay2 = async () => {
    const url3 = `/stripe/payment2`;
    await axios
      .post(url3, {}, await axiosConfig())
      .then((response: AxiosResponse<any>) => {
        console.log(response);
        push(response.data.checkout_url);
      });
  };

  if (isLoading) return <></>;
  return (
    <Container sx={{ paddingTop: 8 }}>
      <GoToCreditCardResisterFormButton stripeCustomerId={stripeCustomerId} />
      <p>{stripeCustomerId}</p>

      {/* striptのプロパティにloadStripを渡す。こうすることで子のコンポーネントでstripeのサービスが利用できるのようになる */}
      <StripeElements stripe={promise}>
        <PaymentForm clientSecret={clientSecret}></PaymentForm>
      </StripeElements>
      <Button onClick={() => pay2()} variant="contained" type="submit">
        <Typography>購入</Typography>
      </Button>
    </Container>
  );
};

export default Payment;

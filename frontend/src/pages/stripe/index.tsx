import { NextPage } from 'next';
import React, { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { axiosConfig } from '../../util/axios/axios-config';
import { Container } from '@mui/material';
import { GoToCreditCardResisterFormButton } from '../../component/organism/stripe/go-to-credit-card-resister-form';
import { useAuthContext } from '../../util/auth/auth-context';
import { CenterLoading } from '../../component/atom/center-loading';
import { useRouter } from 'next/router';
import { useAuthBlocker } from '../../util/auth/use-auth-block';

// 以下mock
const getAccountId = () => 'aaa';
const getEmail = () => 'ampersand.dev@gmail.com';

const Stripe: NextPage = () => {
  const { back } = useRouter();
  const [notLoginEdBlocker, notVerifiedBlocker] = useAuthBlocker(back);
  const [stripeCustomerId, setStripeCustomerId] = useState('');
  const { currentUser } = useAuthContext();
  const [isLoading, setLoading] = useState(true);

  const getStripeCustomerId = async () => {
    const id = getAccountId();
    const data = { email: getEmail() };
    const url = `/stripe/${id}`;
    const result = await axios.post(url, data, await axiosConfig());
    setStripeCustomerId(result.data);
  };

  useLayoutEffect(() => {
    const f = async () => {
      if (currentUser === undefined) return <CenterLoading />;
      await notLoginEdBlocker();
      await notVerifiedBlocker();
      if (currentUser?.type === 'verified') {
        await getStripeCustomerId();
        setLoading(false);
      }
    };
    f();
  }, [currentUser]);

  if (isLoading) return <></>;
  return (
    <Container sx={{ paddingTop: 8 }}>
      <GoToCreditCardResisterFormButton stripeCustomerId={stripeCustomerId} />
      <p>{stripeCustomerId}</p>
    </Container>
  );
};

export default Stripe;

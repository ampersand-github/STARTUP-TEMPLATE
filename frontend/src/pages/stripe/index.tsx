import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { CustomButton } from '../../component/atom/custom-button';
import axios, { AxiosResponse } from 'axios';
import { axiosConfig } from '../../util/axios/axios-config';
import { useForm } from 'react-hook-form';
import { TextForm } from '../../component/atom/form/text-form';
import { emailRule } from '../../util/validation-rule/email-rule';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

// 以下mock
const getAccountId = () => 'aaa';
const getEmail = () => 'ampersand.dev@gmail.com';

const Stripe: NextPage = (props: any) => {
  const { push } = useRouter();
  const [stripeCustomerId, setStripeCustomerId] = useState('');

  useEffect(() => {
    const act = async () => {
      const id = getAccountId();
      const data = { email: getEmail() };
      const result = await axios.post(
        `/stripe/${id}`,
        data,
        await axiosConfig(),
      );
      console.log(result);
      setStripeCustomerId(result.data);
    };
    act();
  }, []);

  const onSubmit = async () => {
    console.log(stripeCustomerId);
    axios
      .post(`/stripe/add/${stripeCustomerId}`, {}, await axiosConfig())
      .then((response: AxiosResponse<any>) => {
        console.log(`status:${response.status}`);
        console.log(`data:${JSON.stringify(response.data)}`);
        push(response.data.checkout_url);
      });
  };

  return (
    <Container sx={{ paddingTop: 8 }}>
      <Button onClick={onSubmit} variant="contained" type="submit">
        <Typography>クレジットカードを登録する</Typography>
      </Button>
      <p>{stripeCustomerId}</p>
    </Container>
  );
};

export default Stripe;

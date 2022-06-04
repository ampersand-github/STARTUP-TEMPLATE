import axios, { AxiosResponse } from 'axios';
import { axiosConfig } from '../../../util/axios/axios-config';
import { useRouter } from 'next/router';
import { Button, Typography } from '@mui/material';

export interface ICreditCardResisterFormButton {
  stripeCustomerId: string;
}

export const GoToCreditCardResisterFormButton = (
  props: ICreditCardResisterFormButton,
): JSX.Element => {
  const { push } = useRouter();

  const creditCardResisterForm = async () => {
    const url = `/stripe/add/${props.stripeCustomerId}`;
    axios
      .post(url, {}, await axiosConfig())
      .then((response: AxiosResponse<any>) => {
        console.log(`status:${response.status}`);
        console.log(`data:${JSON.stringify(response.data)}`);
        push(response.data.checkout_url);
      });
  };

  const onSubmit = async () => {
    await creditCardResisterForm();
  };

  return (
    <Button onClick={onSubmit} variant="contained" type="submit">
      <Typography>クレジットカードを登録する</Typography>
    </Button>
  );
};

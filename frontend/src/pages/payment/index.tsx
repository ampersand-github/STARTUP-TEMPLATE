import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container } from '@mui/material';

interface IPayment {
  accountId: string;
  email: string;
}

const Payment: NextPage<IPayment> = (props: IPayment) => {
  const { push } = useRouter();

  return (
    <Container sx={{ paddingTop: 8 }}>
      <p> - - - - - - - - - - - - - - - - - </p>
      <Box sx={{ display: 'flex' }}>
        <p>書籍1</p>
        <p>値段:100</p>
        <Button
          onClick={() => {
            console.log('saaa');
            push({
              pathname: 'http://localhost:3000/payment/payment-form/',
              query: { productId: 'sssssss' },
            });
          }}
        >
          購入する
        </Button>
      </Box>
    </Container>
  );
};

export default Payment;

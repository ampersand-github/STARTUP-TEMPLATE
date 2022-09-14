import { Box } from '@mui/material';
import { IProduct } from 'src/service/stripe/get-payment-product';
import React from 'react';

export const PurchaseInfo = (props: IProduct): JSX.Element => {
  return (
    <Box>
      <img src={props.image} width={240} alt={''} />
      <p>{props.name}</p>
      <p>{props.price}円</p>
    </Box>
  );
};

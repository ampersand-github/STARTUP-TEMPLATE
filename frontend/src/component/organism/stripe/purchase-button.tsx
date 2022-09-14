import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import React from 'react';

export interface IPurchaseButton {
  cardInputComplete: boolean;
  isLoading: boolean;
  stripeLoading: boolean;
  elementLoading: boolean;
  onClick: (e: any) => Promise<void>;
}
export const PurchaseButton = (props: IPurchaseButton): JSX.Element => {
  // 以下の(条件)の場合、条件を満たす場合true
  // !で否定なので、!(条件)の場合、条件を満たす場合false
  const disable = () =>
    !props.cardInputComplete &&
    !props.isLoading &&
    props.stripeLoading &&
    props.elementLoading;

  return props.isLoading ? (
    <LoadingButton loading>購入する</LoadingButton>
  ) : (
    <Button onClick={props.onClick} disabled={disable()}>
      購入する
    </Button>
  );
};

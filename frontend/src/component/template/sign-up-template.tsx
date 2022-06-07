import React from 'react';
import { Grid, Stack } from '@mui/material';
import { ISignInFormContext } from 'src/component/organism/sign-in-form';
import { CustomLinkButton } from 'src/component/atom/custom-link-button';
import { SubmitHandler } from 'react-hook-form';
import { SignUpIcon } from 'src/component/atom/sign-up-icon';
import { SignUpForm } from 'src/component/organism/sign-up-form';

export interface ISignInTemplate {
  onSubmit: SubmitHandler<ISignInFormContext>;
}
export const SignUpTemplate = (props: ISignInTemplate): JSX.Element => {
  return (
    <Stack spacing={2}>
      <SignUpIcon />
      <SignUpForm onSubmit={props.onSubmit} />
      <Grid marginTop={2} container>
        <CustomLinkButton
          text={'ログインする'}
          link={'/auth/sign-in'}
          variant={'caption'}
        />
      </Grid>
    </Stack>
  );
};

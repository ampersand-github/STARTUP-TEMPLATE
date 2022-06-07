import React from 'react';
import { Grid, Stack } from '@mui/material';
import {
  ISignInFormContext,
  SignInForm,
} from 'src/component/organism/sign-in-form';
import { SignInIcon } from 'src/component/atom/sign-in-icon';
import { CustomLinkButton } from 'src/component/atom/custom-link-button';
import { SubmitHandler } from 'react-hook-form';
import { INDEX_URL, SIGN_UP_URL } from 'src/service/url';

export interface ISignInTemplate {
  onSubmit: SubmitHandler<ISignInFormContext>;
}
export const SignInTemplate = (props: ISignInTemplate): JSX.Element => {
  return (
    <Stack spacing={2}>
      <SignInIcon />
      <SignInForm onSubmit={props.onSubmit} />
      <Grid marginTop={2} container>
        <Grid item xs>
          <CustomLinkButton
            text={'パスワードを忘れた場合'}
            link={INDEX_URL}
            variant={'caption'}
          />
        </Grid>
        <Grid item>
          <CustomLinkButton
            text={'新規登録する'}
            link={SIGN_UP_URL}
            variant={'caption'}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

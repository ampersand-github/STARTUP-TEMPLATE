import { NextPage } from 'next';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { CustomLinkButton } from 'src/component/atom/custom-link-button';
import {
  ISignUpFormContext,
  SignUpForm,
} from 'src/component/organism/sign-up-form';
import { SignUpIcon } from 'src/component/atom/sign-up-icon';
import { useAuthContext } from 'src/service/auth/auth-context';
import { CenterLoading } from 'src/component/atom/center-loading';
import { ISignUpResult, signUp } from 'src/service/auth/sign-up';
import { firebaseAuth } from 'src/service/firebase-config';

const SignUpPage: NextPage = () => {
  const router = useRouter();
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 既にログインしていたらこのページを表示しない
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const { currentUser } = useAuthContext();
  if (currentUser === undefined) return <CenterLoading />;

  if (currentUser) {
    router.push({ pathname: '/' });
    return <CenterLoading />;
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // ボタン押下時処理
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const onSubmit: SubmitHandler<ISignUpFormContext> = async (
    data: ISignUpFormContext,
  ) => {
    const signUpResult: ISignUpResult = await signUp({
      auth: firebaseAuth,
      email: data.email,
      password: data.password,
    });
    if (signUpResult.result === 'ok') {
      await router.push({
        pathname: '/',
      });
    }
  };

  return (
    <Stack spacing={2}>
      <SignUpIcon />
      <SignUpForm onSubmit={onSubmit} />
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

export default SignUpPage;

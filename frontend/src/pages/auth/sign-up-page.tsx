import { NextPage } from 'next';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { auth } from '../_app';
import { CustomSnackbar } from 'component/atom/custom-snack-bar';
import { ISignUpResult, signUp } from 'util/auth/sign-up';
import { useAuthContext } from 'util/auth/auth-context';
import { CenterLoading } from 'component/atom/center-loading';
import { CustomLinkButton } from '../../component/atom/custom-link-button';
import {
  ISignUpFormContext,
  SignUpForm,
} from '../../component/organism/sign-up-form';
import { SignUpIcon } from '../../component/atom/sign-up-icon';

const SignUpPage: NextPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
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
      auth,
      email: data.email,
      password: data.password,
    });
    if (signUpResult.result === 'ok') {
      await router.push({
        pathname: '/',
      });
    } else {
      setMessage(signUpResult.message);
      setOpen(true);
    }
  };

  return (
    <Stack spacing={2}>
      <CustomSnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        alertType={'error'}
      />
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

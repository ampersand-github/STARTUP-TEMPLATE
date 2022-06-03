import { NextPage } from 'next';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { auth } from '../_app';
import { CustomLinkButton } from '../../component/atom/custom-link-button';
import {
  ISignUpFormContext,
  SignUpForm,
} from '../../component/organism/sign-up-form';
import { SignUpIcon } from '../../component/atom/sign-up-icon';
import { useAuthContext } from 'src/util/auth/auth-context';
import { CenterLoading } from '../../component/atom/center-loading';
import { ISignUpResult, signUp } from '../../util/auth/sign-up';

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

import { NextPage } from 'next';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Avatar, Grid, Stack, Typography, Button } from '@mui/material';
import { EmailTextField } from 'component/atom/email-text-field';
import { PasswordTextField } from 'component/atom/password-text-field';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/router';
import { auth } from '../_app';
import { CustomSnackbar } from 'component/atom/custom-snack-bar';
import { ISignUpResult, signUp } from 'util/auth/sign-up';
import { useAuthContext } from 'util/auth/auth-context';
import { CenterLoading } from 'component/atom/center-loading';
import {CustomLinkButton} from "../../component/atom/custom-link-button";

export interface ISignUp {
  email: string;
  password: string;
}

const SignUp: NextPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
  const onSubmit: SubmitHandler<any> = async (data) => {
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
    <>
      <CustomSnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        alertType={'error'}
      />

      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{ marginTop: 8 }}
      >
        <Grid container direction="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >新規登録</Typography>
        </Grid>
        <EmailTextField control={control} errors={errors} />
        <PasswordTextField control={control} errors={errors} />
        <Button variant="contained" type="submit">
          <Typography>新規登録する</Typography>
        </Button>
        <Grid container>
          <Grid item xs>
            <CustomLinkButton text={"ログインする"} link={'/auth/sign-in'}  variant={'caption'}/>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default SignUp;

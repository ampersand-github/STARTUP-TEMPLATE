import { NextPage } from 'next';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Avatar, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { EmailTextField } from 'component/atom/email-text-field';
import { PasswordTextField } from 'component/atom/password-text-field';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/router';
import { useAuthContext } from 'util/auth/auth-context';
import { ISignInResult, signIn } from 'util/auth/sign-in';
import { auth } from '../_app';
import { CustomSnackbar } from 'component/atom/custom-snack-bar';
import { CenterLoading } from 'component/atom/center-loading';
import { CustomLinkButton } from '../../component/atom/custom-link-button';

export interface ISignIn {
  email: string;
  password: string;
}

const SignIn: NextPage = () => {
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
    router.push({
      pathname: '/',
    });
    return <CenterLoading />;
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // ボタン押下時処理
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const onSubmit: SubmitHandler<any> = async (data: ISignIn) => {
    const signInResult: ISignInResult = await signIn({
      auth,
      email: data.email,
      password: data.password,
    });
    if (signInResult.result === 'ok') {
      await router.push({
        pathname: '/',
      });
    } else {
      setMessage(signInResult.message);
      setOpen(true);
    }
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 画面
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
        </Grid>
        <EmailTextField control={control} errors={errors} />
        <PasswordTextField control={control} errors={errors} />
        <Button variant="contained" type="submit">
          <Typography>ログインする</Typography>
        </Button>
        <Grid container>
          <Grid item xs>
            <CustomLinkButton
              text={'パスワードを忘れた場合'}
              link={'#'}
              variant={'caption'}
            />
          </Grid>
          <Grid item>
            <CustomLinkButton
              text={'新規登録する'}
              link={'/auth/sign-up'}
              variant={'caption'}
            />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};
export default SignIn;

import { NextPage } from 'next';
import React, { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { ISignInFormContext } from 'src/component/organism/sign-in-form';
import { SubmitHandler } from 'react-hook-form';
import { useAuthContext } from 'src/service/auth/auth-context';
import { CenterLoading } from 'src/component/atom/center-loading';
import { ISignInResult, signIn } from 'src/service/auth/sign-in';
import { firebaseAuth } from 'src/service/firebase-config';
import { SignInTemplate } from 'src/component/template/sign-in-template';
import { INDEX_URL } from 'src/service/url';
import { useAuthBlocker } from 'src/service/auth/use-auth-block';
import { useCustomSnackbar } from 'src/service/notification/use-custom-snackbar';

const SignIn: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [alreadySignInEdBlocker] = useAuthBlocker(router.back);
  const customSnackbar = useCustomSnackbar();
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 既にログインしていたらこのページを表示しない
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  useLayoutEffect(() => {
    const cleanUp = async () => {
      if (currentUser === undefined) return <CenterLoading />;
      if (currentUser) alreadySignInEdBlocker();
    };
    cleanUp();
  }, [currentUser]);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // ボタン押下時処理
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const onSubmit: SubmitHandler<ISignInFormContext> = async (
    data: ISignInFormContext,
  ) => {
    const signInResult: ISignInResult = await signIn({
      auth: firebaseAuth,
      email: data.email,
      password: data.password,
    });

    signInResult.result === 'ok'
      ? await router.push({ pathname: INDEX_URL })
      : customSnackbar({ message: signInResult.message, variant: 'error' });
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // 画面
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  return <SignInTemplate onSubmit={onSubmit} />;
};
export default SignIn;

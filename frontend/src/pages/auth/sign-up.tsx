import { NextPage } from 'next';
import React, { useLayoutEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ISignUpFormContext } from 'src/component/organism/sign-up-form';
import { useAuthContext } from 'src/service/auth/auth-context';
import { CenterLoading } from 'src/component/atom/center-loading';
import { ISignUpResult, signUp } from 'src/service/auth/sign-up';
import { firebaseAuth } from 'src/service/firebase-config';
import { SignUpTemplate } from 'src/component/template/sign-up-template';
import { INDEX_URL } from 'src/service/url';
import { useCustomSnackbar } from 'src/service/notification/use-custom-snackbar';

const SignUp: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const customSnackbar = useCustomSnackbar();

  useLayoutEffect(() => {
    const cleanUp = async () => {
      console.log(currentUser);
      if (currentUser === undefined) return <CenterLoading />;
    };
    cleanUp();
  }, [currentUser]);

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

    signUpResult.result === 'ok'
      ? await router.push({ pathname: INDEX_URL })
      : customSnackbar({ message: signUpResult.message, variant: 'error' });
  };
  return <SignUpTemplate onSubmit={onSubmit} />;
};

export default SignUp;

import React, { ReactNode, useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';
import { Header } from 'src/component/organism/header';
import { Footer } from 'src/component/organism/footer';
import { useAuthContext } from 'src/service/auth/auth-context';
import { signOut } from '@firebase/auth';
import router from 'next/router';
import { firebaseAuth } from 'src/service/firebase-config';
import { SIGN_IN_URL, SIGN_UP_URL } from 'src/service/url';

export interface IBaseLayout {
  children: ReactNode;
}

export const BaseLayout = (props: IBaseLayout): JSX.Element => {
  const { currentUser } = useAuthContext();
  const [isAuthState, setAuthState] = useState<boolean>(false);
  useEffect(() => {
    setAuthState(!!currentUser);
  }, [currentUser]);

  const onSignOut = (): Promise<void> => {
    return signOut(firebaseAuth).then(() => {
      console.log('onSignOut-ok');
      router.push('');
    });
  };

  return (
    <Stack justifyContent="center">
      <Header
        isAuth={isAuthState}
        onSignOut={onSignOut}
        signInUrl={SIGN_IN_URL}
        signUpUrl={SIGN_UP_URL}
      />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {props.children}
      </Container>
      <Footer />
    </Stack>
  );
};

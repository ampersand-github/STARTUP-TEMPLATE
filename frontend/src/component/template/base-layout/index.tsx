import React, { ReactNode, useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';
import { Header, IHeader } from '../../organism/header';
import { Footer } from '../../organism/footer';
import { useAuthContext } from '../../../util/auth/auth-context';
import { signOut } from '@firebase/auth';
import { auth } from '../../../pages/_app';
import router from 'next/router';

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
    return signOut(auth).then(() => {
      console.log('onSignOut-ok');
      router.push('');
    });
  };

  return (
    <Stack justifyContent="center">
      <Header
        isAuth={isAuthState}
        onSignOut={onSignOut}
        signInUrl="/auth/sign-in"
        signUpUrl="/auth/sign-up"
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

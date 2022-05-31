import React, { ReactNode } from 'react';
import { Container, Stack } from '@mui/material';
import { Header, IHeader } from '../../organism/header';
import { Footer } from '../../organism/footer';

export interface IBaseLayout {
  children: ReactNode;
  header: IHeader;
}

export const BaseLayout = (props: IBaseLayout): JSX.Element => {
  return (
    <Stack justifyContent="center">
      <Header
        isAuth={props.header.isAuth}
        onSignOut={props.header.onSignOut}
        signInUrl={props.header.signInUrl}
        signUpUrl={props.header.signUpUrl}
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

import React, { ReactNode } from 'react';
import { Container, Stack } from '@mui/material';
import { Header } from '../../organism/header';
import { Footer } from '../../organism/footer';

export interface IBaseLayout {
  children: ReactNode;
}

export const BaseLayout = (props: IBaseLayout): JSX.Element => {
  return (
    <Stack justifyContent="center">
      <Header />
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

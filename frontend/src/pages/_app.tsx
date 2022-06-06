import React from 'react';
import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../service/auth/auth-context';
import { BaseLayout } from '../component/template/base-layout';
import { ThemeProvider } from '@mui/material';
import { NotificationProvider } from '../service/notification/notification-provider';
import { theme } from 'src/service/theme';
import { firebaseAuth } from 'src/service/firebase-config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider firebaseAuth={firebaseAuth}>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <CssBaseline />
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;

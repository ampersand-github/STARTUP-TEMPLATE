import React from 'react';
import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../service/auth/auth-context';
import { BaseLayout } from '../component/template/base-layout';
import { ThemeProvider } from '@mui/material';
import { theme } from 'src/service/theme';
import { firebaseAuth } from 'src/service/firebase-config';
import { SnackbarProvider } from 'notistack';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider firebaseAuth={firebaseAuth}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          iconVariant={{
            error: <ErrorIcon />,
            success: <CheckCircleIcon />,
            warning: <WarningIcon />,
            info: <CheckCircleIcon />,
          }}
        >
          <CssBaseline />
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;

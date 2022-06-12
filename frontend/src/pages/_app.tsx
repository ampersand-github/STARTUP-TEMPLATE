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
import { loadStripe } from '@stripe/stripe-js';

const stripeApiKey = process.env.NEXT_PUBLIC_STRIPE_API_KEY;
if (!stripeApiKey) throw new Error('stripeApiKeyが存在しません');
export const stripePromise = loadStripe(stripeApiKey);
//
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled')
  require('../service/mocks');
//
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

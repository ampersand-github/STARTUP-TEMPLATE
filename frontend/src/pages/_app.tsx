import React from 'react';
import type { AppProps } from 'next/app';
import { getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from '@firebase/auth';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../util/auth/auth-context';
import { BaseLayout } from '../component/template/base-layout';
import { createTheme, ThemeProvider } from '@mui/material';
import { purple } from '@mui/material/colors';
import { NotificationProvider } from '../util/notification/notification-provider';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Firebase設定
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const getFirebaseApp = () => getApps()[0] || initializeApp(config);

export const app = getFirebaseApp();
export const auth: Auth = getAuth(app);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
    error: {
      main: '#FF7D7D',
    },
    warning: {
      main: purple[500],
    },
  },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider firebaseAuth={auth}>
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

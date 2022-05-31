import React from 'react';
import type { AppProps } from 'next/app';
import { getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from '@firebase/auth';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../util/auth/auth-context';
import { BaseLayout } from '../component/template/base-layout';
import { signOut } from '../util/auth/sign-out';
import { IHeader } from '../component/organism/header';
import router from 'next/router';

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
function MyApp({ Component, pageProps }: AppProps) {
  const headerProps: IHeader = {
    isAuth: !!auth.currentUser,
    signInUrl: '/auth/sign-in',
    signUpUrl: '/auth/sign-up',
    onSignOut: () => {
      return signOut(auth).then(() => {
        console.log('onSignOut-ok');
        router.push('');
      });
    },
  };
  return (
    <AuthProvider firebaseAuth={auth}>
      <CssBaseline />
      <BaseLayout header={headerProps}>
        <Component {...pageProps} />
      </BaseLayout>
    </AuthProvider>
  );
}

export default MyApp;

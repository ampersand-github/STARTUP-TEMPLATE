import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { Box } from '@mui/material';
import { CenterLoading } from '../component/atom/center-loading';
import { useAuthContext } from '../service/auth/auth-context';
import { CustomLinkButton } from 'src/component/atom/custom-link-button';
import { PAYMENT_URL } from 'src/service/url';
import { useCustomSnackbar } from 'src/service/notification/use-custom-snackbar';

// https://mui.com/material-ui/react-app-bar/
const Home: NextPage = () => {
  const { currentUser } = useAuthContext();
  const createEnqueueSnackbar = useCustomSnackbar();

  const message = '登録したメールアドレスに確認メールを送信しました。';
  useEffect(() => {
    if (currentUser?.type === 'notVerified') {
      createEnqueueSnackbar({ message, variant: 'warning' });
    }
  }, [currentUser]);
  if (currentUser === undefined) return <CenterLoading />;

  return (
    <>
      <Box>{currentUser ? 'ログイン済み' : 'ログインしていない'}</Box>
      <p>{currentUser?.type === 'verified' ? currentUser.user.email : '-'}</p>
      <CustomLinkButton link={PAYMENT_URL} text={'payment'} />
    </>
  );
};

export default Home;

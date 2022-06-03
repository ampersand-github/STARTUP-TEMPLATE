import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { CenterLoading } from '../component/atom/center-loading';
import { useAuthContext } from '../util/auth/auth-context';
import { useNotification } from '../util/notification/notification-provider';
import { CustomLinkButton } from '../component/atom/custom-link-button';

// https://mui.com/material-ui/react-app-bar/
const Home: NextPage = () => {
  const { currentUser } = useAuthContext();
  const showNotification = useNotification();

  const message = (
    <Typography>
      登録したメールアドレスに確認メールを送信しました。
      <br />
      メールのリンクから登録を完了してください。
    </Typography>
  );

  useEffect(() => {
    if (currentUser?.type === 'notVerified') {
      showNotification({ text: message, type: 'error' });
    }
  }, [currentUser]);
  if (currentUser === undefined) return <CenterLoading />;

  return (
    <>
      <Box>{currentUser ? 'ログイン済み' : 'ログインしていない'}</Box>
      <p>{currentUser?.type === 'verified' ? currentUser.user.email : '-'}</p>
      <CustomLinkButton link={'./stripe'} text={'stripe'} />
    </>
  );
};

export default Home;

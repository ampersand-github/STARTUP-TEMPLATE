import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Box } from '@mui/material';
import { useAuthContext } from 'util/auth/auth-context';
import { CustomSnackbar } from 'component/atom/custom-snack-bar';
import { CenterLoading } from 'component/atom/center-loading';

const WaitingEmailVerifiedCustomSnackbar = (): JSX.Element => {
  const { currentUser } = useAuthContext();
  const [open, setOpen] = useState(false);
  const message =
    '登録したメールアドレスに確認メールを送信しました。メールのリンクから登録を完了してください。';
  useEffect(() => {
    if (currentUser !== undefined) {
      currentUser?.type === 'notVerified' ? setOpen(true) : setOpen(false);
    }
  }, [currentUser]);
  return (
    <CustomSnackbar
      open={open}
      setOpen={setOpen}
      message={message}
      alertType={'warning'}
    />
  );
};

// https://mui.com/material-ui/react-app-bar/
const Home: NextPage = () => {
  const { currentUser } = useAuthContext();
  if (currentUser === undefined) return <CenterLoading />;
  console.log(currentUser);
  return (
    <>
      <WaitingEmailVerifiedCustomSnackbar />
      <Box>{currentUser ? 'ログイン済み' : 'ログインしていない'}</Box>
      <p>{currentUser?.type === 'verified' ? currentUser.user.email : '-'}</p>
    </>
  );
};

export default Home;

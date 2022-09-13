import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { Box, Button } from '@mui/material';
import { CenterLoading } from '../component/atom/center-loading';
import { useAuthContext } from '../service/auth/auth-context';
import { CustomLinkButton } from 'src/component/atom/custom-link-button';
import { MOCK_BOOK_URL } from 'src/service/url';
import { useCustomSnackbar } from 'src/service/notification/use-custom-snackbar';
import { useRouter } from 'next/router';

// https://mui.com/material-ui/react-app-bar/
const Home: NextPage = () => {
  const { push } = useRouter();
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
      <Box sx={{ display: 'flex' }}>
        <p>書籍名</p>
        <p>〇〇円</p>
        <Button
          onClick={() => {
            push({
              pathname: 'http://localhost:3000/purchase/',
              query: { productId: 'id_id_id_id' },
            });
          }}
        >
          購入する
        </Button>
      </Box>

      <CustomLinkButton link={MOCK_BOOK_URL} text={'mock-book'} />
    </>
  );
};

export default Home;

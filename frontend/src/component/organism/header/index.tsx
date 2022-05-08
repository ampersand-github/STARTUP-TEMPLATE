import React from 'react';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { useAuthContext } from 'util/auth/auth-context';
import { Box } from '@mui/material';
import { auth } from 'pages/_app';
import { signOut } from 'util/auth/sign-out';

export const Header = (): JSX.Element => {
  const { currentUser } = useAuthContext();
  return (
    <AppBar position="static" component={'header'}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          書籍レンタルシステム
        </Typography>
        {currentUser ? <WhenLogin /> : <WhenNotLogin />}
      </Toolbar>
    </AppBar>
  );
};

const WhenNotLogin = (): JSX.Element => {
  return (
    <Box>
      <Button color="inherit">
        <Link href="/auth/sign-in">
          <Typography>ログイン</Typography>
        </Link>
      </Button>
      <Button color="inherit">
        <Link href="/auth/sign-up">
          <Typography>新規登録</Typography>
        </Link>
      </Button>
    </Box>
  );
};

const WhenLogin = (): JSX.Element => {
  return (
    <Button
      color="inherit"
      onClick={() => {
        signOut(auth).then(() => {
          console.log('ok');
        });
      }}
    >
      サインアウト
    </Button>
  );
};

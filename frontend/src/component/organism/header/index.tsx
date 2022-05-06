import React from 'react';
import Link from 'next/link';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";

export const Header = (): JSX.Element => {
  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            書籍レンタルシステム
          </Typography>
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
        </Toolbar>
      </AppBar>
  );
};

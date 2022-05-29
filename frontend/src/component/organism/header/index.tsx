import React from 'react';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { Box } from '@mui/material';
import { CustomLinkButton } from '../../atom/custom-link-button';
import { CustomButton } from '../../atom/custom-button';

export interface IHeader {
  isAuth: boolean; // 認証済みか
  signInUrl: string;
  signUpUrl: string;
  onSignOut: Promise<void>;
}

export const Header = (props: IHeader): JSX.Element => {
  return (
    <AppBar position="static" component={'header'}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          書籍レンタルシステム
        </Typography>
        {props.isAuth ? (
          <CustomButton text={'サインアウト'} onClick={props.onSignOut} />
        ) : (
          <>
            <CustomLinkButton text={'ログイン'} link={props.signInUrl} />
            <CustomLinkButton text={'新規登録'} link={props.signUpUrl} />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

import React from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';

interface ILinkText {
  text: string;
  path: string;
  variant:
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2';
}

export const LinkText = (props: ILinkText): JSX.Element => {
  return (
    <Link href={props.path}>
      <a>
        <Typography variant={props.variant}>{props.text}</Typography>
      </a>
    </Link>
  );
};

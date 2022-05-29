import Link from 'next/link';
import { Typography } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';

interface ICustomLinkButton {
  text: string;
  link: string;
    variant?:
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

export const CustomLinkButton = (props: ICustomLinkButton): JSX.Element => {
  return (
    <Button color="inherit">
      <Link href={props.link}>
        <Typography variant={props.variant}>{props.text}</Typography>
      </Link>
    </Button>
  );
};

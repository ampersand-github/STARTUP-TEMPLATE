import Link from 'next/link';
import { Typography } from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';

interface ICustomLinkButton {
  text: string;
  link: string;
}

export const CustomLinkButton = (props: ICustomLinkButton): JSX.Element => {
  return (
    <Button color="inherit">
      <Link href={props.link}>
        <Typography>{props.text}</Typography>
      </Link>
    </Button>
  );
};

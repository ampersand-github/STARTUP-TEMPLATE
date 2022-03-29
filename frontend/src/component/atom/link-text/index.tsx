import React from 'react';
import Link from 'next/link';

interface ILinkText {
  text: string;
  path: string;
}

export const LinkText = (props: ILinkText): JSX.Element => {
  return (
    <Link href={props.path}>
      <a>{props.text}</a>
    </Link>
  );
};

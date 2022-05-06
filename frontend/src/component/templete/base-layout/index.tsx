import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import {Header} from "../../organism/header";

export interface IBaseLayout {
  children: ReactNode;
}

export const BaseLayout = (props: IBaseLayout): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header/>
      <main>{props.children}</main>
    </Box>
  );
};

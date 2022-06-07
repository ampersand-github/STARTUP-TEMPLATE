import React, { ReactNode } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import { Box } from '@mui/material';
import { theme } from 'src/service/theme';

export interface IUseCustomNote {
  message: string | ReactNode;
  variant: VariantType;
}
export const useCustomSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const setBackGroundColor = (variant: VariantType) => {
    if (variant === 'error') return theme.palette.error.light;
    if (variant === 'success') return theme.palette.success.light;
    if (variant === 'warning') return theme.palette.warning.light;
    if (variant === 'info') return theme.palette.info.light;
    if (variant === 'default') return theme.palette.info.light;
    return theme.palette.info.light;
  };
  const setColor = (variant: VariantType) => {
    if (variant === 'error') return theme.palette.grey;
    if (variant === 'success') return theme.palette.grey;
    if (variant === 'warning') return theme.palette.grey;
    if (variant === 'info') return theme.palette.grey;
    if (variant === 'default') return theme.palette.grey;
    return theme.palette.grey;
  };

  const createComponent = (children: ReactNode): JSX.Element => {
    return <Box sx={{ paddingLeft: 2 }}>{children}</Box>;
  };

  return (props: IUseCustomNote) => {
    const returnValue = enqueueSnackbar(createComponent(props.message), {
      variant: props.variant,
      onClick: () => {
        closeSnackbar(returnValue);
      },
      // @ts-ignore
      sx: {
        '& .SnackbarContent-root': {
          color: setColor(props.variant),
          backgroundColor: setBackGroundColor(props.variant),
        },
      },
    });
    return returnValue;
  };
};

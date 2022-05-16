import { Alert, IconButton, Snackbar } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface ICustomSnackbar {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  alertType: 'error' | 'warning' | 'info' | 'success';
}

export const CustomSnackbar = (props: ICustomSnackbar): JSX.Element => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={props.open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
    >
      <Alert
        onClose={handleClose}
        severity={props.alertType}
        sx={{ width: '100%' }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

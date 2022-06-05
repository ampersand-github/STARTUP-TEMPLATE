import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { usePortal } from './usePortal';
import CloseIcon from '@mui/icons-material/Close';

// https://www.wantedly.com/users/26190108/post_articles/345447

export interface INotificationProvider {
  children: ReactNode;
}

export interface INotificationContext {
  text: string | ReactNode;
  type: 'error' | 'warning' | 'info' | 'success';
}

const NotificationContext = createContext((props: INotificationContext) => {});

export const NotificationProvider = (props: INotificationProvider) => {
  const [isShow, setShow] = useState(false);
  const [NotificationText, setNotificationText] =
    useState<INotificationContext['text']>('');
  const [NotificationType, setNotificationType] =
    useState<INotificationContext['type']>('success');
  const [showModal, setShowModal] = useState(false);
  const modalElement = usePortal('modal');

  useEffect(() => {
    setShowModal(true);
  }, []);

  if (!showModal) return null;
  if (!modalElement) return null;

  const showNotification = (props: INotificationContext) => {
    setNotificationText(props.text);
    setNotificationType(props.type);
    setShow(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    setShow(false);
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
  const SnackBar = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isShow}
        action={action}
        onClose={handleClose}
        autoHideDuration={4000}
      >
        <Alert
          sx={{ width: '100%', alignItems: 'center' }}
          onClose={handleClose}
          severity={NotificationType}
        >
          {NotificationText}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {props.children}
      {createPortal(SnackBar(), document.getElementById('__next')!)}
    </NotificationContext.Provider>
  );
};
export const useNotification = () => useContext(NotificationContext);

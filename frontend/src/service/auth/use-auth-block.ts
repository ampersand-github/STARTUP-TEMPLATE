import { useAuthContext } from './auth-context';
import { useCustomSnackbar } from 'src/service/notification/use-custom-snackbar';

export const useAuthBlocker = (back: () => void) => {
  const { currentUser } = useAuthContext();
  const customSnackbar = useCustomSnackbar();
  const notLoginEdBlocker = () => {
    if (currentUser === null) {
      customSnackbar({ message: 'ログインしてください', variant: 'error' });
      back();
    }
  };

  const notVerifiedBlocker = () => {
    if (currentUser?.type === 'notVerified') {
      customSnackbar({ message: 'メール認証をしてください', variant: 'error' });

      back();
    }
  };

  const alreadySignInEdBlocker = () => {
    if (
      currentUser?.type === 'notVerified' ||
      currentUser?.type === 'verified'
    ) {
      customSnackbar({ message: 'すでにログイン済みです', variant: 'warning' });
      back();
    }
  };

  return [notLoginEdBlocker, notVerifiedBlocker, alreadySignInEdBlocker];
};

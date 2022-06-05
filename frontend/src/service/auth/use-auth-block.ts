import { useAuthContext } from './auth-context';
import { useNotification } from '../notification/notification-provider';

export const useAuthBlocker = (back: () => void) => {
  const { currentUser } = useAuthContext();
  const showNotification = useNotification();

  const notLoginEdBlocker = () => {
    if (currentUser === null) {
      showNotification({ text: 'ログインしてください', type: 'error' });
      back();
    }
  };

  const notVerifiedBlocker = () => {
    if (currentUser?.type === 'notVerified') {
      showNotification({ text: 'メール認証をしてください', type: 'error' });
      back();
    }
  };

  return [notLoginEdBlocker, notVerifiedBlocker];
};

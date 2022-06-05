import { Auth, signOut as firebaseSignOut } from '@firebase/auth';

export const signOut = async (auth: Auth): Promise<void> => {
  await firebaseSignOut(auth);
};

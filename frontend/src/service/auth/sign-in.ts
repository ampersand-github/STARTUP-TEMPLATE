import { Auth, signInWithEmailAndPassword } from '@firebase/auth';
import { FirebaseError } from 'firebase/app';
export interface ISignIn {
  auth: Auth;
  email: string;
  password: string;
}

export interface ISignInResult {
  result: 'ok' | 'ng';
  message: string;
}
export const signIn = async (props: ISignIn): Promise<ISignInResult> => {
  try {
    await signInWithEmailAndPassword(props.auth, props.email, props.password);
    return { result: 'ok', message: '' };
  } catch (error) {
    if (!(error instanceof FirebaseError)) {
      return { result: 'ng', message: 'something wrong' };
    }
    const firebaseError = error as FirebaseError;
    if (firebaseError.code === 'auth/invalid-email') {
      return {
        result: 'ng',
        message: 'メールアドレスの形式が正しくありません',
      };
    } else if (firebaseError.code === 'auth/email-already-in-use') {
      return {
        result: 'ng',
        message: '既に登録されているメールアドレスです。',
      };
    } else if (firebaseError.code === 'auth/wrong-password') {
      return { result: 'ng', message: 'パスワードが誤っています' };
    } else if (firebaseError.code === 'auth/user-not-found') {
      return { result: 'ng', message: 'ユーザーが存在しません' };
    } else {
      return { result: 'ng', message: firebaseError.code.toString() };
    }
  }
};

import { Auth, onAuthStateChanged, User } from '@firebase/auth';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IVerifiedUser {
  type: 'verified';
  user: User;
}

interface INotVerifiedUser {
  type: 'notVerified';
  user: User;
}

interface IAuthContext {
  // IVerifiedUser : 登録後、email認証まで終わらせた場合
  // INotVerifiedUser : email認証がまだの場合
  // null : 未登録
  // undefined : まだfirebaseから読み込まれていない
  currentUser: IVerifiedUser | INotVerifiedUser | null | undefined;
}

export interface IAuthProvider {
  children: ReactNode;
  firebaseAuth: Auth;
}

const defaultValue: IAuthContext = {
  currentUser: undefined,
};
const AuthContext = createContext<IAuthContext>(defaultValue);

export const AuthProvider = (props: IAuthProvider): JSX.Element => {
  const [currentUser, setCurrentUser] = useState(defaultValue.currentUser);

  useEffect(() => {
    onAuthStateChanged(props.firebaseAuth, (user: User | null) => {
      // ログイン状態が変化すると呼ばれる
      if (user === null) return setCurrentUser(null);
      if (user && !user.emailVerified)
        return setCurrentUser({ type: 'notVerified', user });
      if (user && user.emailVerified)
        return setCurrentUser({ type: 'verified', user });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

import * as admin from 'firebase-admin';
import { firebaseConfig } from './firebase-config';

export const firebaseInit = () => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  }
};

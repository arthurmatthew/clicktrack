import { useEffect, useState } from 'react';
import { TUserContext } from '../types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const useUser = () => {
  const [userContext, setUserContext] = useState<TUserContext>({
    user: null,
    premium: false,
    initialized: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUserContext({
        user: firebaseUser,
        premium: false,
        initialized: true,
      });
    });
    return () => unsubscribe();
  }, []);

  return userContext;
};

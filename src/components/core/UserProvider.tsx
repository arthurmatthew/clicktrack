import { User, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect, createContext, useRef } from 'react';
import { auth } from '../../firebase';
import { IComponent } from '../IComponent';
import { TUserContext } from '../../types';
import { getUserPremium } from '../../lib/firebase/getUserPremium';

export const UserContext = createContext<TUserContext>({
  user: null,
  premium: false,
  initialized: false,
});

export const UserProvider = ({ children }: IComponent) => {
  const [user, setUser] = useState<User | null>(null);
  const [premium, setPremium] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  const previousUserRef = useRef<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userPremium = await getUserPremium();
        setPremium(userPremium);
      }

      setUser(authUser);

      // !if (!previousUserRef.current && authUser) {
      //  ! migrateLocalToCloud().catch((err) =>
      //  !   console.error('Failed migration', err)
      //  ! );
      // !}

      previousUserRef.current = authUser;
      setInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  const contextValue: TUserContext = {
    user,
    premium,
    initialized,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

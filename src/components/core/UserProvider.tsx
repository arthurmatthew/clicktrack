import { User, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect, createContext } from 'react';
import { auth } from '../../firebase';
import { IComponent } from '../IComponent';
import { TUserContext } from '../../types';
import { getUserPremium } from '../../lib/firebase/getUserPremium';

export const UserContext = createContext<TUserContext>({
  user: null,
  premium: false,
});

export const UserProvider = ({ children }: IComponent) => {
  const [user, setUser] = useState<User | null>(null);
  const [premium, setPremium] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (authUser) {
        const userPremium = await getUserPremium();
        setPremium(userPremium);
      }
    });
  }, []);

  const contextValue: TUserContext = {
    user: user,
    premium: premium,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

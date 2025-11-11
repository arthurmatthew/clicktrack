import { useEffect, useState } from 'react';
import { getGlobalContext } from 'vike/server';
import { TUserContext } from '../types';

export const useUser = () => {
  const [userContext, setUserContext] = useState<TUserContext>({
    user: null,
    premium: false,
    initialized: false,
  });

  useEffect(() => {
    let isMounted = true;

    const loadContext = async () => {
      const globalContext = await getGlobalContext();
      if (isMounted) {
        setUserContext(previousContext => {
          return{
          user: globalContext.user ?? previousContext.user,
          premium: globalContext.premium ?? previousContext.premium,
          initialized: globalContext.initialized ?? previousContext.initialized,
        }});
      }
    };

    loadContext();

    return () => { isMounted = false; };
  }, []);

  return userContext;
};

import { GlobalContext } from 'vike/types';
import { STORAGE_KEYS_DARKMODE } from '../config';

export const onCreateGlobalContext = async (globalContext: GlobalContext) => {
  // const authUser = await new Promise<User | null>((resolve) => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     unsubscribe();
  //     resolve(user);
  //   });
  // });

  globalContext.user = null;
  globalContext.premium = false; // ! not implemented anymore
  globalContext.initialized = false; // should always be true because we await the user

  //theme
  const stored = localStorage.getItem(STORAGE_KEYS_DARKMODE);
  globalContext.darkMode = stored === 'true';

  return globalContext;
};

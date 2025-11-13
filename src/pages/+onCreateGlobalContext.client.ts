import { GlobalContext } from 'vike/types';

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

  return globalContext;
};

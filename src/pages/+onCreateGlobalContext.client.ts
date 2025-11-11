import { onAuthStateChanged, User } from "firebase/auth";
import { GlobalContext } from "vike/types"
import { auth } from "../firebase";
import { getUserPremium } from "../lib/firebase/getUserPremium";

export const onCreateGlobalContext = async (globalContext: GlobalContext) => {
  globalContext.user = null
  globalContext.premium = false
  globalContext.initialized = false;

  onAuthStateChanged(auth, async (authUser: User | null) => {
    globalContext.user = authUser
    if (authUser) {
      globalContext.premium = await getUserPremium()
    }

    globalContext.initialized = true
  })

  return globalContext
}
import { User } from "firebase/auth";

export {};

declare global {
  namespace Vike {
    interface GlobalContext {
      user?: User | null;
      premium?: boolean;
      initialized?: boolean
    }
  }
}
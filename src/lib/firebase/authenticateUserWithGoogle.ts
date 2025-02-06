import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../../firebase';

export const authenticateUserWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};

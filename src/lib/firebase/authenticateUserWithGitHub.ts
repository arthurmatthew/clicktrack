import { GithubAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../../firebase';

export const authenticateUserWithGitHub = () => {
  const provider = new GithubAuthProvider();
  signInWithRedirect(auth, provider);
};

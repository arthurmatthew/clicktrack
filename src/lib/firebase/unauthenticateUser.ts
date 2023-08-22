import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export const unauthenticateUser = async () => {
  await signOut(auth).catch((error) => {
    console.error(error);
    return;
  });
};

import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../../firebase';

export const reauthenticateUser = async (password: string) => {
  const user = auth.currentUser;

  if (user && user.email) {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential).catch((error) =>
      console.error(error)
    );
  }
};

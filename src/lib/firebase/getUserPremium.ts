import { auth } from '../../firebase';

export const getUserPremium = async () => {
  const firebaseRole = 'premium';
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdTokenResult(true);
    const stripeRole = token.claims.stripeRole as string | null | undefined;

    if (stripeRole === firebaseRole) return true;
  }

  return false;
};

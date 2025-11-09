import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

export const updateUserProfile = async (profileData: {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
}) => {
  const user = auth.currentUser;

  if (user) {
    await updateProfile(user, profileData);
  }
};

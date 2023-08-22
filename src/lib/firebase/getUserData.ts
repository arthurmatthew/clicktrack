import { doc, getDoc } from 'firebase/firestore';
import { DB_USERS_COLLECTION_KEY } from '../../config';
import { auth, db } from '../../firebase';
import { TUserDocument } from '../../types';

export const getUserData = async () => {
  const user = auth.currentUser;

  if (user) {
    const cloudStoredUserDataRef = doc(db, DB_USERS_COLLECTION_KEY, user.uid);
    const cloudStoredUserDataSnap = await getDoc(cloudStoredUserDataRef);

    if (cloudStoredUserDataSnap.exists())
      return cloudStoredUserDataSnap.data() as TUserDocument;
  }
};

import { collection, setDoc, doc } from 'firebase/firestore';
import { DB_USERS_COLLECTION_KEY } from '../../config';
import { auth, db } from '../../firebase';
import { TUserDocument } from '../../types';

export const setUserData = async (data: TUserDocument) => {
  const user = auth.currentUser;

  if (user) {
    const usersCollectionRef = collection(db, DB_USERS_COLLECTION_KEY);
    await setDoc(doc(usersCollectionRef, user.uid), data);
  }
};

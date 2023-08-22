import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, setDoc, doc } from 'firebase/firestore';
import { DB_USERS_COLLECTION_KEY } from '../../config';
import { auth, db } from '../../firebase';

export const createUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (userCredential) {
    const usersCollectionRef = collection(db, DB_USERS_COLLECTION_KEY);
    await setDoc(doc(usersCollectionRef, userCredential.user.uid), {
      clicktracks: JSON.stringify([]),
    });
  }
};

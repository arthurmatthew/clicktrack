import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { DB_USERS_COLLECTION_KEY } from '../config';
import { Clicktrack } from '../models/Clicktrack';
import { TUserDocument } from '../types';

export const loadAvailableClicktrack = async (id: string) => {
  try {
    const user = auth.currentUser;

    if (user) {
      const cloudStoredUserDataRef = doc(db, DB_USERS_COLLECTION_KEY, user.uid);
      const cloudStoredUserDataSnap = await getDoc(cloudStoredUserDataRef);
      if (
        cloudStoredUserDataSnap.exists() &&
        cloudStoredUserDataSnap.data().clicktracks !== undefined
      ) {
        const cloudStoredUserData =
          cloudStoredUserDataSnap.data() as TUserDocument;
        const minifiedCloudClicktracks = JSON.parse(
          cloudStoredUserData.clicktracks
        ) as string[]; // these are encoded and minifed in useEffect below
        const cloudClicktracks = minifiedCloudClicktracks.map(
          (minifiedClicktrack) => Clicktrack.decode(minifiedClicktrack)
        );

        console.log(cloudClicktracks);

        return cloudClicktracks.find((clicktrack) => clicktrack.id === id);
      }
    }

    throw new Error('Unable to load clicktrack(s)');
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

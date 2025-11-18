import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { DB_SHARED_CLICKTRACKS_COLLECTION_KEY } from '../../config';
import { TSharedClicktrackDocument } from '../../types';
import { Clicktrack } from '../../models/Clicktrack';

export const getSharedClicktrack = async (shareId: string) => {
  try {
    const docRef = doc(db, DB_SHARED_CLICKTRACKS_COLLECTION_KEY, shareId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const docData = docSnap.data() as TSharedClicktrackDocument;

    const { data, name } = docData;
    const clicktrack = Clicktrack.decode(data);

    if (!clicktrack) {
      return null;
    }

    const newClicktrack = new Clicktrack({
      ...clicktrack,
      id: undefined,
      name: name || clicktrack.name,
    });

    return newClicktrack;
  } catch (error) {
    console.error('Error in loadSharedClicktrack:', error);
    return null;
  }
};

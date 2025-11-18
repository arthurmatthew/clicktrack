import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  DB_SHARED_CLICKTRACKS_COLLECTION_KEY,
  DB_SHARED_CLICKTRACKS_DICTIONARY_COLLECTION_KEY,
} from '../../config';
import {
  TSharedClicktrackDictionaryDocument,
  TSharedClicktrackDocument,
} from '../../types';
import { nanoid } from 'nanoid';

export const shareClicktrack = async (
  id: string,
  userId: string,
  meta: Omit<TSharedClicktrackDocument, 'createdAt'>,
) => {
  try {
    const dictionaryRef = doc(
      db,
      DB_SHARED_CLICKTRACKS_DICTIONARY_COLLECTION_KEY,
      id,
    );
    const dictionarySnap = await getDoc(dictionaryRef);

    if (dictionarySnap.exists()) {
      const { shareId } =
        dictionarySnap.data() as TSharedClicktrackDictionaryDocument;
      return `${window.location.origin}/app/clicktracks/c?share=${shareId}`;
    }

    const shareId = nanoid(10);

    await setDoc(doc(db, DB_SHARED_CLICKTRACKS_COLLECTION_KEY, shareId), {
      ...meta,
      createdAt: new Date().toISOString(),
    } satisfies TSharedClicktrackDocument);

    await setDoc(dictionaryRef, {
      shareId,
      createdBy: userId,
    } satisfies TSharedClicktrackDictionaryDocument);

    return `${window.location.origin}/app/clicktracks/c?share=${shareId}`;
  } catch (error) {
    console.error(error);
    return null;
  }
};

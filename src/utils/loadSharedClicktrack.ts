import { getSharedClicktrack } from '../lib/firebase/getSharedClicktrack';

export const loadSharedClicktrack = async (shareId: string) => {
  try {
    const sharedClicktrack = await getSharedClicktrack(shareId);
    return sharedClicktrack;
  } catch (error) {
    console.error(error);
    return null;
  }
};

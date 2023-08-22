import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Clicktrack } from '../models/Clicktrack';
import { setUserData } from '../lib/firebase/setUserData';
import { getUserClicktracks } from '../lib/firebase/getUserClicktracks';

export const useCloudClicktracks = () => {
  const [clicktracks, setClicktracks] = useState<Clicktrack[] | undefined>();

  useEffect(() => {
    onAuthStateChanged(auth, async () => {
      const userClicktracks = await getUserClicktracks();
      setClicktracks(userClicktracks);
    });
  }, []);

  const updateCloudClicktracks = async (updatedData: Clicktrack[]) => {
    const minifiedClicktracks = updatedData.map((clicktrack) =>
      Clicktrack.encode(clicktrack)
    );

    await setUserData({
      clicktracks: JSON.stringify(minifiedClicktracks),
    });
  };

  useEffect(() => {
    if (clicktracks) updateCloudClicktracks(clicktracks);
  }, [clicktracks]);

  return { clicktracks, setClicktracks };
};

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Clicktrack } from '../models/Clicktrack';
import { setUserData } from '../lib/firebase/setUserData';
import { getUserClicktracks } from '../lib/firebase/getUserClicktracks';
import { STORAGE_KEYS_CLICKTRACK } from '../config';

/**
 * This hook monitors the user auth and returns a state-like variable for
 * Clicktracks with all the logic in-between to save to the cloud
 */
export const useClicktrackStorage = () => {
  const [clicktracks, setClicktracks] = useState<Clicktrack[] | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Monitor user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        // Cloud storage loading
        const userClicktracks = await getUserClicktracks();
        setClicktracks(userClicktracks);
      } else {
        // Local storage loading
        const localClicktracks = localStorage.getItem(STORAGE_KEYS_CLICKTRACK);
        setClicktracks(localClicktracks ? JSON.parse(localClicktracks) : []);
      }
    });
    return () => unsubscribe();
  }, []);

  const updateClicktracks = async (updatedData: Clicktrack[]) => {
    if (isLoggedIn) {
      const minifiedClicktracks = updatedData.map((clicktrack) =>
        Clicktrack.encode(clicktrack)
      );

      await setUserData({
        clicktracks: minifiedClicktracks,
      });
    } else {
      localStorage.setItem(
        STORAGE_KEYS_CLICKTRACK,
        JSON.stringify(updatedData)
      );
    }
  };

  useEffect(() => {
    if (clicktracks) updateClicktracks(clicktracks);
  }, [clicktracks]);

  return { clicktracks, setClicktracks };
};

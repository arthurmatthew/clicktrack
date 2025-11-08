import { useEffect, useState } from 'react';
import { Clicktrack } from '../models/Clicktrack';
import { setUserData } from '../lib/firebase/setUserData';
import { getUserClicktracks } from '../lib/firebase/getUserClicktracks';
import { STORAGE_KEYS_CLICKTRACK } from '../config';
import { useUser } from './useUser';

/**
 * This hook monitors the user auth and returns a state variable for
 * Clicktracks with all the logic in-between to save to the cloud
 */
export const useClicktrackStorage = () => {
  const [clicktracks, setClicktracks] = useState<Clicktrack[] | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setIsLoggedIn(!!user);
    if (user) {
      getUserClicktracks().then((userClicktracks) =>
        setClicktracks(userClicktracks)
      );
    } else {
      // Local storage loading
      const localClicktracks = localStorage.getItem(STORAGE_KEYS_CLICKTRACK);
      setClicktracks(localClicktracks ? JSON.parse(localClicktracks) : []);
    }
  }, [user]);

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

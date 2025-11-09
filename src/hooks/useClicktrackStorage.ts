import { useEffect, useState } from 'react';
import { Clicktrack } from '../models/Clicktrack';
import { setUserData } from '../lib/firebase/setUserData';
import { getUserClicktracks } from '../lib/firebase/getUserClicktracks';
import { STORAGE_KEYS_CLICKTRACK } from '../config';
import { useUser } from './useUser';
import { loadLocalClicktracks } from '../utils/loadLocalClicktracks';

/**
 * This hook monitors the user auth and returns a state variable for
 * Clicktracks with all the logic in-between to save to the cloud
 */
export const useClicktrackStorage = () => {
  const [clicktracks, setClicktracks] = useState<Clicktrack[] | undefined>();
  const { user, initialized } = useUser();

  useEffect(() => {
    if (initialized) {
      if (user) {
        getUserClicktracks().then((userClicktracks) =>
          setClicktracks(userClicktracks)
        );
      } else {
        // Local storage loading
        setClicktracks(loadLocalClicktracks());
      }
    }
  }, [user, initialized]);

  const updateClicktracks = async (updatedData: Clicktrack[]) => {
    if (user) {
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

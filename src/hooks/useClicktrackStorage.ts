import { useCallback, useEffect, useRef, useState } from 'react';
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
  const debounceTimerRef = useRef<number>(0);

  useEffect(() => {
    if (initialized) {
      if (user) {
        getUserClicktracks()
          .then((userClicktracks) => setClicktracks(userClicktracks))
          .catch((error) =>
            console.error('Failed to load clicktracks: ', error),
          );
      } else {
        try {
          setClicktracks(loadLocalClicktracks());
        } catch (error) {
          console.error('Failed to load local clicktracks: ', error);
        }
      }
    }
  }, [user, initialized]);

  const updateClicktracks = useCallback(
    async (updatedData: Clicktrack[]) => {
      if (user) {
        const minifiedClicktracks = updatedData.map((clicktrack) =>
          Clicktrack.encode(clicktrack),
        );

        await setUserData({
          clicktracks: minifiedClicktracks,
        });
      } else {
        localStorage.setItem(
          STORAGE_KEYS_CLICKTRACK,
          JSON.stringify(updatedData),
        );
      }
    },
    [user],
  );

  useEffect(() => {
    if (clicktracks) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = window.setTimeout(() => {
        updateClicktracks(clicktracks);
      }, 500);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      // save on unmount to avoid loss
      if (clicktracks) {
        updateClicktracks(clicktracks);
      }
    };
  }, [clicktracks]);

  return { clicktracks, setClicktracks };
};

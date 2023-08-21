import { useEffect, useRef, useState } from 'react';
import { Clicktrack } from '../models/Clicktrack';
import { usePlayClicktrack } from './usePlayClicktrack';
import { useSection } from './useSection';
import { DB_USERS_COLLECTION_KEY } from '../config';
import { useAnimationControls } from 'framer-motion';
import { ClicktrackData } from '../models/ClicktrackData';
import { isEqual } from 'lodash';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { TUserDocument } from '../types';

export const useClicktrack = (loadedClicktrack: Clicktrack) => {
  const [clicktrack, setClicktrack] = useState<Clicktrack>(
    Clicktrack.parseInternals(loadedClicktrack)
  );
  const [saving, setSaving] = useState(false);
  const lastSavedClicktrack = useRef<Clicktrack>(
    Clicktrack.parseInternals(loadedClicktrack)
  );
  const clicktracksSynced = (): boolean => {
    return isEqual(clicktrack, lastSavedClicktrack.current);
  };

  const getClicktracksFromCloud = async () => {
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

        return cloudClicktracks;
      }
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    const user = auth.currentUser;
    const currentSavedClicktracks = await getClicktracksFromCloud();

    if (currentSavedClicktracks === undefined || user === null) {
      setSaving(false);
      return;
    }

    const indexOfEdited = currentSavedClicktracks.indexOf(
      lastSavedClicktrack.current
    );
    const currentSavedWithoutEdited = currentSavedClicktracks.filter(
      (currentClicktrack) => currentClicktrack.id !== clicktrack.id
    );

    const result = [...currentSavedWithoutEdited];
    result.splice(indexOfEdited, 0, clicktrack);

    const usersCollectionRef = collection(db, DB_USERS_COLLECTION_KEY);
    const minifiedClicktracks = result.map((clicktrack) =>
      Clicktrack.encode(clicktrack)
    );

    await setDoc(doc(usersCollectionRef, user.uid), {
      clicktracks: JSON.stringify(minifiedClicktracks),
    });

    lastSavedClicktrack.current = clicktrack;
    setChangesSaved(clicktracksSynced());
    setSaving(false);
  };

  const [changesSaved, setChangesSaved] = useState(clicktracksSynced());

  useEffect(() => {
    setChangesSaved(clicktracksSynced());
  }, [clicktrack]);

  // end of db syncing stuff

  const updateClicktrackData = (update: Partial<Clicktrack['data']>): void => {
    setClicktrack((previousClicktrack) => {
      const updatedData = new ClicktrackData({
        ...previousClicktrack.data,
        ...update,
      });
      return new Clicktrack({
        ...previousClicktrack,
        data: updatedData,
      });
    });
  };

  const pulseAnimationControls = useAnimationControls();
  const startPulseAnimation = () => {
    void pulseAnimationControls.start({
      filter: ['hue-rotate(45deg)', 'hue-rotate(0)'],
      transition: { duration: 1, ease: 'easeOut' },
    });
  };
  const { play, playingDisplay, selectedId, setSelectedId } = usePlayClicktrack(
    clicktrack,
    () => {
      startPulseAnimation();
    }
  );
  const [settingsShown, setSettingsShown] = useState(false);
  const {
    addSection,
    updateSection,
    copySection,
    deleteSection,
    sequencerOnDragEnd,
  } = useSection(setClicktrack, setSelectedId);

  return {
    clicktrack,
    play,
    playingDisplay,
    selectedId,
    setSelectedId,
    pulseAnimationControls,
    startPulseAnimation,
    updateClicktrackData,
    addSection,
    updateSection,
    copySection,
    deleteSection,
    settingsShown,
    setSettingsShown,
    sequencerOnDragEnd,
    changesSaved,
    saveChanges,
    saving,
  };
};

import { useEffect, useRef, useState } from 'react';
import { Clicktrack } from '../models/Clicktrack';
import { usePlayClicktrack } from './usePlayClicktrack';
import { useSection } from './useSection';
import { STORAGE_KEYS_CLICKTRACK } from '../config';
import { useAnimationControls } from 'framer-motion';
import { ClicktrackData } from '../models/ClicktrackData';
import { isEqual } from 'lodash';

export const useClicktrack = (loadedClicktrack: Clicktrack) => {
  const [clicktrack, setClicktrack] = useState<Clicktrack>(
    Clicktrack.parseInternals(loadedClicktrack)
  );
  const syncedClicktrack = useRef<Clicktrack>(
    Clicktrack.parseInternals(loadedClicktrack)
  );
  const clicktracksSynced = (): boolean => {
    return isEqual(clicktrack, syncedClicktrack.current);
  };

  const saveChanges = () => {
    const storedClicktracks = JSON.parse(
      localStorage.getItem(STORAGE_KEYS_CLICKTRACK) as string
    ) as Clicktrack[];
    const updatedClicktracks = JSON.stringify([
      ...storedClicktracks.filter(
        (storedClicktrack) => storedClicktrack.id !== clicktrack.id
      ),
      clicktrack,
    ]);

    syncedClicktrack.current = clicktrack;
    localStorage.setItem(STORAGE_KEYS_CLICKTRACK, updatedClicktracks);
    setChangesSaved(clicktracksSynced());
  };
  const [changesSaved, setChangesSaved] = useState(clicktracksSynced());

  useEffect(() => {
    setChangesSaved(clicktracksSynced());
  }, [clicktrack]);

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
  };
};

import { useState } from 'react';
import { Clicktrack } from '../models/Clicktrack';
import { usePlayClicktrack } from './usePlayClicktrack';
import { useSection } from './useSection';
import { useAnimationControls } from 'framer-motion';
import { ClicktrackData } from '../models/ClicktrackData';
import { useCloudClicktrack } from './useCloudClicktrack';

export const useClicktrack = (loadedClicktrack: Clicktrack) => {
  const { clicktrack, setClicktrack, saveChanges, saving, changesSaved } =
    useCloudClicktrack(loadedClicktrack);

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

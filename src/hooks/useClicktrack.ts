import { useState } from 'react';
import { Clicktrack } from '../models/Clicktrack';
import { usePlayClicktrack } from '../metronome/usePlayClicktrack';
import { useSection } from './useSection';
import { useAnimationControls } from 'framer-motion';
import { ClicktrackData } from '../models/ClicktrackData';
import { useCloudClicktrack } from './useCloudClicktrack';

// ! Check console logs, when pressing the play button it triggers these

export const useClicktrack = (loadedClicktrack: Clicktrack) => {
  // console.log(
  //   'useClicktrack initialized with loadedClicktrack:',
  //   loadedClicktrack
  // );

  const { clicktrack, setClicktrack, saveChanges, saving, changesSaved } =
    useCloudClicktrack(loadedClicktrack);

  // console.log('useCloudClicktrack returned:', {
  //   clicktrack,
  //   saving,
  //   changesSaved,
  // });

  const updateClicktrackData = (update: Partial<Clicktrack['data']>): void => {
    // console.log('updateClicktrackData called with update:', update);
    setClicktrack((previousClicktrack) => {
      // console.log('previousClicktrack:', previousClicktrack);
      const updatedData = new ClicktrackData({
        ...previousClicktrack.data,
        ...update,
      });
      // console.log('updatedData:', updatedData);
      const newClicktrack = new Clicktrack({
        ...previousClicktrack,
        data: updatedData,
      });
      // console.log('newClicktrack:', newClicktrack);
      return newClicktrack;
    });
  };

  const updateClicktrackName = (newName: string): void => {
    setClicktrack((previousClicktrack) => {
      return new Clicktrack({
        ...previousClicktrack,
        name: newName,
      });
    });
  };

  const pulseAnimationControls = useAnimationControls();
  const startPulseAnimation = () => {
    // console.log('startPulseAnimation called');
    void pulseAnimationControls.start({
      filter: ['hue-rotate(45deg)', 'hue-rotate(0)'],
      transition: { duration: 1, ease: 'easeOut' },
    });
  };
  const {
    play,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    selectedId,
    setSelectedId,
    playFromSection,
  } = usePlayClicktrack(clicktrack, () => {
    if (clicktrack.data.flashPlayButton) startPulseAnimation();
  });
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
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
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
    playFromSection,
    updateClicktrackName,
  };
};

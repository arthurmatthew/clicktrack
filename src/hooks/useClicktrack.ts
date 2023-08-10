import { useState } from 'react';
import { Clicktrack } from '../models/Clicktrack';
import { useClicktrackDataUpdater } from './clicktrack/useClicktrackDataUpdater';
import { useClicktrackPlayer } from './clicktrack/useClicktrackPlayer';
import { useClicktrackUpdater } from './clicktrack/useClicktrackUpdater';
import { useSection } from './useSection';
import { usePulseAnimationControls } from './clicktrack/usePulseAnimationControls';

export const useClicktrack = (loadedClicktrack: Clicktrack) => {
  const [clicktrack, setClicktrack] = useState<Clicktrack>(
    Clicktrack.parseInternals(loadedClicktrack)
  );

  useClicktrackUpdater(clicktrack);
  const { pulseAnimationControls, startPulseAnimation } =
    usePulseAnimationControls();
  const { play, playingDisplay, selectedId, setSelectedId } =
    useClicktrackPlayer(clicktrack, () => {
      startPulseAnimation();
    });
  const { addSection, updateSection, copySection, deleteSection } = useSection(
    setClicktrack,
    setSelectedId
  );
  const { updateClicktrackData } = useClicktrackDataUpdater(setClicktrack);
  const [settingsShown, setSettingsShown] = useState(false);

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
  };
};

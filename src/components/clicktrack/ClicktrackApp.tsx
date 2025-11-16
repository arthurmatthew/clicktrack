import { motion } from 'framer-motion';
import { Controls } from './Controls';
import { Title } from './Title';
import { useClicktrack } from '../../hooks/useClicktrack';
import { Clicktrack } from '../../models/Clicktrack';
import { useEffect } from 'react';

interface IClicktrackApp {
  loadedClicktrack: Clicktrack;
}

export const ClicktrackApp = ({ loadedClicktrack }: IClicktrackApp) => {
  const {
    clicktrack,
    playFromSection,
    pause,
    resume,
    stop,
    isPlaying,
    selectedId,
    setSelectedId,
    pulseAnimationControls,
    updateClicktrackData,
    addSection,
    updateSection,
    copySection,
    deleteSection,
    settingsShown,
    setSettingsShown,
    sequencerOnDragEnd,
    saveChanges,
    changesSaved,
    isPaused,
    saving,
    updateClicktrackName,
  } = useClicktrack(loadedClicktrack);

  useEffect(() => {
    document.title = clicktrack.name + ' - clicktrack';
  }, [clicktrack.name]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      )
        return;

      if (e.code === 'Space') {
        e.preventDefault();

        if (isPlaying) {
          if (isPaused) {
            resume();
          } else {
            pause();
          }
        } else {
          void playFromSection(selectedId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isPaused, pause, resume, playFromSection, selectedId]);

  return (
    <motion.div className="flex min-h-0 min-w-full flex-1 flex-col overflow-hidden">
      <Title
        {...{
          clicktrack,
          isPlaying,
          pulseAnimationControls,
          settingsShown,
          setSettingsShown,
          updateClicktrackData,
          saveChanges,
          changesSaved,
          saving,
          pause,
          resume,
          stop,
          isPaused,
          updateClicktrackName,
        }}
        play={() => {
          void playFromSection(selectedId);
        }}
      />
      <Controls
        sequence={clicktrack.data.sections}
        selected={clicktrack.data.sections.find(
          (section) => section.id === selectedId,
        )}
        {...{
          clicktrack,
          selectedId,
          setSelectedId,
          addSection,
          updateSection,
          copySection,
          deleteSection,
          sequencerOnDragEnd,
          isPlaying,
        }}
      />
    </motion.div>
  );
};

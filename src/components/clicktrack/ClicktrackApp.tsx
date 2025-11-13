import { motion } from 'framer-motion';
import { Controls } from './Controls';
import { Title } from './Title';
import { useClicktrack } from '../../hooks/useClicktrack';
import { Clicktrack } from '../../models/Clicktrack';

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
  } = useClicktrack(loadedClicktrack);

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

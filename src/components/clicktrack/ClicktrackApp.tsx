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
    play,
    playingDisplay,
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
    saving,
  } = useClicktrack(loadedClicktrack);

  return (
    <motion.div className="flex min-h-0 min-w-full flex-1 flex-col">
      <Title
        {...{
          clicktrack,
          playingDisplay,
          pulseAnimationControls,
          settingsShown,
          setSettingsShown,
          updateClicktrackData,
          saveChanges,
          changesSaved,
          saving,
        }}
        play={() => {
          void play();
        }}
      />
      <Controls
        sequence={clicktrack.data.sections}
        selected={clicktrack.data.sections.find(
          (section) => section.id === selectedId
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
          playingDisplay,
        }}
      />
    </motion.div>
  );
};

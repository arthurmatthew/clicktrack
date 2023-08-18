import { motion } from 'framer-motion';
import { useClicktrack } from '../../hooks/useClicktrack';
import { Clicktrack } from '../../models/Clicktrack';
import { Controls } from './Controls';
import { Title } from './Title';

export const ClicktrackApp = ({
  loadedClicktrack,
}: {
  loadedClicktrack: Clicktrack;
}) => {
  const {
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
  } = useClicktrack(loadedClicktrack);

  return (
    <motion.div className="flex min-h-screen min-w-full flex-col">
      <Title
        {...{
          clicktrack,
          playingDisplay,
          startPulseAnimation,
          pulseAnimationControls,
          settingsShown,
          setSettingsShown,
          updateClicktrackData,
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

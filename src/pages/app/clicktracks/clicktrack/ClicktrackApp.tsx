import { motion } from 'framer-motion';
import { Title } from '../../../../components/clicktrack/Title';
import { Controls } from '../../../../components/clicktrack/Controls';
import { Clicktrack } from '../../../../models/Clicktrack';
import { useClicktrack } from '../../../../hooks/useClicktrack';

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
  } = useClicktrack(loadedClicktrack);

  return (
    <motion.div className="flex min-h-screen min-w-full flex-col">
      <Title
        {...{
          clicktrack,
          play,
          playingDisplay,
          startPulseAnimation,
          pulseAnimationControls,
          settingsShown,
          setSettingsShown,
          updateClicktrackData,
        }}
      />
      <Controls
        {...{
          clicktrack,
          selectedId,
          setSelectedId,
          addSection,
          updateSection,
          copySection,
          deleteSection,
        }}
      />
    </motion.div>
  );
};

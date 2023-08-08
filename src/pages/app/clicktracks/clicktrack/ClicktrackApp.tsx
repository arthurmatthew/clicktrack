import { motion } from 'framer-motion';
import { Title } from '../../../../components/clicktrack/Title';
import { Controls } from '../../../../components/clicktrack/Controls';
import { Clicktrack } from '../../../../models/Clicktrack';
import { useClicktrackPlayer } from '../../../../hooks/useClicktrackPlayer';
import { useVisualizer } from '../../../../hooks/useVisualizer';
import { useSection } from '../../../../hooks/useSection';
import { useClicktrackUpdater } from '../../../../hooks/useClicktrackUpdater';
import { useClicktrackData } from '../../../../hooks/useClicktrackData';
import { useState } from 'react';

export const ClicktrackApp = ({
  loadedClicktrack,
}: {
  loadedClicktrack: Clicktrack;
}) => {
  const [clicktrack, setClicktrack] = useState<Clicktrack>(
    Clicktrack.parseInternals(loadedClicktrack)
  );

  useClicktrackUpdater(clicktrack);
  const { controls, pulse } = useVisualizer();
  const { play, playingDisplay, selectedId, setSelectedId } =
    useClicktrackPlayer(clicktrack, () => {
      pulse();
    });
  const { addSection, updateSection, copySection, deleteSection } = useSection(
    setClicktrack,
    setSelectedId
  );
  const { updateClicktrackData } = useClicktrackData(setClicktrack);
  const [settingsShown, setSettingsShown] = useState(false);

  return (
    <motion.div className="flex min-h-screen min-w-full flex-col">
      <Title
        {...{
          clicktrack,
          play,
          playingDisplay,
          pulse,
          controls,
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

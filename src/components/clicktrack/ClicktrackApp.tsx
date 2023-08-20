import { motion } from 'framer-motion';
import { Controls, IControls } from './Controls';
import { Title } from './Title';
import { ITitleInfo } from './TitleInfo';
import { ITitleButtons } from './TitleButtons';

export const ClicktrackApp = ({
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
}: ITitleInfo & ITitleButtons & IControls) => {
  return (
    <motion.div className="flex min-h-screen min-w-full flex-col">
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

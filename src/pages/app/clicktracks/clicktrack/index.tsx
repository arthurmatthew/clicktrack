import { useParams } from 'react-router-dom';
import { ClicktrackApp } from '../../../../components/clicktrack/ClicktrackApp';
import { ClicktrackNotFound } from '../../../../components/clicktrack/ClicktrackNotFound';
import { ClicktrackRouteParams } from '../../../../types';
import { Clicktrack } from '../../../../models/Clicktrack';
import { useClicktrack } from '../../../../hooks/useClicktrack';

/**
 * Webpage which loads the metronome from storage and passes it off to the actual application.
 */
const ClicktrackPage = () => {
  const params = useParams<ClicktrackRouteParams>();
  const savedClicktrack = Clicktrack.localFromID(params.id);

  if (savedClicktrack === undefined) return <ClicktrackNotFound />;

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
    saveChanges,
    changesSaved,
  } = useClicktrack(savedClicktrack);

  return (
    <ClicktrackApp
      sequence={clicktrack.data.sections}
      selected={clicktrack.data.sections.find(
        (section) => section.id === selectedId
      )}
      {...{
        clicktrack,
        play,
        saveChanges,
        changesSaved,
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
      }}
    />
  );
};

export default ClicktrackPage;

import { ITitleButtons, TitleButtons } from './TitleButtons';
import { ITitleInfo, TitleInfo } from './TitleInfo';

export const Title = ({
  clicktrack,
  play,
  saveChanges,
  changesSaved,
  playingDisplay,
  pulseAnimationControls,
  settingsShown,
  setSettingsShown,
  updateClicktrackData,
}: ITitleButtons & ITitleInfo) => {
  return (
    <div className="flex w-full items-center justify-center py-8">
      <div className="flex max-w-5xl flex-col items-center justify-center px-6 sm:flex-row sm:px-0">
        <TitleInfo {...{ clicktrack }} />
        <div className="my-3 h-px w-full bg-gradient-to-r from-transparent via-neutral-600/50 to-transparent sm:mx-6 sm:h-10 sm:w-px sm:bg-gradient-to-b" />
        <TitleButtons
          {...{
            clicktrack,
            play,
            saveChanges,
            changesSaved,
            playingDisplay,
            pulseAnimationControls,
            settingsShown,
            setSettingsShown,
            updateClicktrackData,
          }}
        />
      </div>
    </div>
  );
};

import { ITitleButtons, TitleButtons } from './TitleButtons';
import { ITitleInfo, TitleInfo } from './TitleInfo';

export const Title = ({
  clicktrack,
  play,
  saveChanges,
  changesSaved,
  saving,
  playingDisplay,
  pulseAnimationControls,
  settingsShown,
  setSettingsShown,
  updateClicktrackData,
}: ITitleButtons & ITitleInfo) => {
  return (
    <div className="hidden w-full items-center justify-center py-4 md:flex md:py-8">
      <div className="flex max-w-5xl items-center justify-between md:justify-center md:px-6">
        <TitleInfo {...{ clicktrack }} />
        <div className="my-3 hidden h-px w-full bg-gradient-to-r from-transparent via-zinc-600/50 to-transparent sm:mx-6 sm:h-10 sm:w-px sm:bg-gradient-to-b md:block" />
        <TitleButtons
          {...{
            clicktrack,
            play,
            saveChanges,
            changesSaved,
            saving,
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

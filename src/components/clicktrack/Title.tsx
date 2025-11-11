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
    <div className="flex w-full items-center bg-zinc-200 px-4 py-2 dark:bg-zinc-900 md:justify-center md:bg-white md:py-8 md:dark:bg-black">
      <div className="flex w-full items-center justify-between md:justify-center md:px-6">
        <TitleInfo {...{ clicktrack }} />
        <div className="my-3 hidden h-px w-full bg-linear-to-r from-transparent via-zinc-600/50 to-transparent sm:mx-6 sm:h-10 sm:w-px sm:bg-linear-to-b md:block" />
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

import { ITitleButtons, TitleButtons } from './TitleButtons';
import { ITitleInfo, TitleInfo } from './TitleInfo';

export const Title = ({
  clicktrack,
  play,
  pause,
  resume,
  stop,
  saveChanges,
  changesSaved,
  saving,
  isPlaying,
  isPaused,
  pulseAnimationControls,
  settingsShown,
  setSettingsShown,
  updateClicktrackData,
}: ITitleButtons & ITitleInfo) => {
  return (
    <div className="flex w-full items-center bg-zinc-200 px-4 py-2 md:justify-center md:bg-white md:py-8 dark:bg-zinc-900 md:dark:bg-black">
      <div className="flex w-full flex-col items-center justify-between gap-1 md:flex-row md:justify-center md:gap-0 md:px-6">
        <TitleInfo {...{ clicktrack }} />
        <div className="my-3 hidden h-px w-full bg-linear-to-r from-transparent via-zinc-600/50 to-transparent sm:mx-6 sm:h-10 sm:w-px sm:bg-linear-to-b md:block" />
        <TitleButtons
          {...{
            clicktrack,
            play,
            pause,
            resume,
            stop,
            saveChanges,
            changesSaved,
            saving,
            isPlaying,
            isPaused,
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

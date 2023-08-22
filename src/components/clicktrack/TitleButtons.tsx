import { motion, AnimatePresence, AnimationControls } from 'framer-motion';
import { SettingsWindow } from './SettingsWindow';
import { Clicktrack } from '../../models/Clicktrack';

export interface ITitleButtons {
  clicktrack: Clicktrack;
  play: () => void;
  saveChanges: () => Promise<void>;
  changesSaved: boolean;
  saving: boolean;
  playingDisplay: boolean;
  pulseAnimationControls: AnimationControls;
  settingsShown: boolean;
  setSettingsShown: (value: React.SetStateAction<boolean>) => void;
  updateClicktrackData: (update: Partial<Clicktrack['data']>) => void;
}

export const TitleButtons = ({
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
}: ITitleButtons) => {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={play}
        animate={pulseAnimationControls}
        className="rounded-sm bg-purple-700 px-4 py-2 text-white"
      >
        <i className={playingDisplay ? 'bi-pause-fill' : 'bi-play-fill'} />
      </motion.button>
      <button
        onClick={saveChanges}
        disabled={changesSaved}
        className="relative rounded-sm bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-20 dark:bg-white dark:text-black"
      >
        {changesSaved === false && (
          <>
            <div className="absolute right-0 top-0 -m-1 h-3 w-3 animate-ping rounded-full bg-purple-500" />
            <div className="absolute right-0 top-0 -m-1 h-3 w-3 rounded-full bg-purple-500" />
          </>
        )}
        {saving ? (
          <i className="bi-arrow-clockwise block animate-spin" />
        ) : (
          <i className="bi-cloud-upload-fill block" />
        )}
      </button>
      <button
        onClick={() => {
          setSettingsShown((previouslyShown) => !previouslyShown);
        }}
        className="group rounded-sm bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
      >
        <i className="bi-gear-fill block duration-150 group-hover:rotate-[40deg]" />
      </button>
      <AnimatePresence>
        {settingsShown && (
          <SettingsWindow
            clicktrack={clicktrack}
            updateSettings={updateClicktrackData}
            hideSettings={() => {
              setSettingsShown(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

import {
  motion,
  AnimatePresence,
  LegacyAnimationControls,
} from 'framer-motion';
import { SettingsWindow } from './SettingsWindow';
import { Clicktrack } from '../../models/Clicktrack';

export interface ITitleButtons {
  clicktrack: Clicktrack;
  play: () => void;
  saveChanges: () => Promise<boolean>;
  changesSaved: boolean;
  saving: boolean;
  isPlaying: boolean;
  pulseAnimationControls: LegacyAnimationControls;
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
  isPlaying,
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
        <i className={isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} />
      </motion.button>
      <button
        onClick={saveChanges}
        disabled={changesSaved}
        className="relative rounded-sm bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-20 dark:bg-white dark:text-black"
      >
        {changesSaved === false && (
          <div className={clicktrack.data.showSaveIndicator ? '' : 'hidden'}>
            <div
              className={`absolute top-0 right-0 -m-1 h-3 w-3 animate-ping rounded-full bg-purple-500 ${
                clicktrack.data.animateSaveIndicator ? '' : 'hidden'
              }`}
            />
            <div className="absolute top-0 right-0 -m-1 h-3 w-3 rounded-full bg-purple-500" />
          </div>
        )}
        {saving ? (
          <i className="bi-arrow-clockwise block animate-spin" />
        ) : (
          <i className="bi bi-floppy-fill" />
        )}
      </button>
      <button
        onClick={() => {
          setSettingsShown((previouslyShown) => !previouslyShown);
        }}
        className="group rounded-sm bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
      >
        <i className="bi-gear-fill block duration-150 group-hover:rotate-40" />
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

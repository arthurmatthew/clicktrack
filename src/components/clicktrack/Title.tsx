import { motion, AnimatePresence, AnimationControls } from 'framer-motion';
import { DataViewItem } from './DataViewItem';
import { SettingsWindow } from './SettingsWindow';
import { Clicktrack } from '../../models/clicktrack/Clicktrack';

interface ITitle {
  clicktrack: Clicktrack;
  play: () => void;
  playingDisplay: boolean;
  pulseDisplay: () => void;
  pulseControl: AnimationControls;
  settingsShown: boolean;
  setSettingsShown: (value: React.SetStateAction<boolean>) => void;
  updateClicktrackData: (update: Partial<Clicktrack['data']>) => void;
}

export const Title = ({
  play,
  clicktrack,
  playingDisplay,
  pulseDisplay,
  pulseControl,
  settingsShown,
  setSettingsShown,
  updateClicktrackData,
}: ITitle) => {
  return (
    <div className="flex w-full items-center justify-center py-8">
      <div className="flex max-w-5xl flex-col items-center justify-center sm:flex-row">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl" onClick={pulseDisplay}>
            {clicktrack.name}
          </h1>
          <ul className="flex text-sm">
            <DataViewItem title={'ID'}>{clicktrack.id}</DataViewItem>
          </ul>
        </div>
        <div className="my-3 h-px w-full bg-gradient-to-r from-transparent via-neutral-600/50 to-transparent sm:mx-6 sm:h-10 sm:w-px sm:bg-gradient-to-b" />
        <div className="flex items-center gap-2">
          <motion.button
            onClick={play}
            animate={pulseControl}
            className="rounded-sm bg-purple-700 px-4 py-2 text-white"
          >
            <i className={playingDisplay ? 'bi-pause-fill' : 'bi-play-fill'} />
          </motion.button>
          <div
            onClick={() =>
              setSettingsShown((previouslyShown) => !previouslyShown)
            }
            className="rounded-sm bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
          >
            <i className="bi-gear-fill" />
          </div>
          <AnimatePresence>
            {settingsShown && (
              <SettingsWindow
                clicktrack={clicktrack}
                updateClicktrackData={updateClicktrackData}
                hideSettings={() => {
                  setSettingsShown(false);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

import { motion } from 'framer-motion';
import { Clicktrack } from '../../models/Clicktrack';
import { SettingsGeneral } from './SettingsGeneral';
import { SettingsPlayback } from './SettingsPlayback';
import { SettingsShare } from './SettingsShare';
import { SettingsSection } from './SettingsSection';
import { downloadClicktrack } from '../../metronome/renderClicktrack';
import { validatePlay } from '../../utils/validators/validatePlay';
import { Setting } from './Setting';
import { SettingsButton } from './SettingsButton';
import { useNotify } from '../../hooks/useNotify';

interface ISettingsWindow {
  clicktrack: Clicktrack;
  hideSettings: () => void;
  updateSettings: (update: Partial<Clicktrack['data']>) => void;
}

export const SettingsWindow = ({
  clicktrack,
  hideSettings,
  updateSettings,
}: ISettingsWindow) => {
  const settings = clicktrack.data;
  const { notify } = useNotify();

  return (
    <div
      className="fixed top-0 left-0 z-999999999 flex h-full max-h-screen w-screen items-center justify-center sm:px-2 sm:pt-14 sm:pb-2"
      onClick={hideSettings}
    >
      <motion.div
        className="relative z-50 h-full w-full max-w-5xl overflow-y-scroll rounded-sm border border-zinc-200 bg-white/70 p-8 shadow-2xl backdrop-blur-md dark:border-zinc-900 dark:bg-black/70"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <h1 className="mb-6 text-left text-3xl font-semibold">
          <i className="bi-x-lg mr-3 cursor-pointer" onClick={hideSettings} />
          Settings
        </h1>
        <div className="flex flex-col gap-4">
          <SettingsShare {...{ clicktrack }} />
          <SettingsSection name="Export">
            <Setting
              label="(experimental)"
              description="Download a rendered (.wav) version of your Clicktrack."
            >
              <SettingsButton
                onClick={() => {
                  if (validatePlay(clicktrack.data.sections, notify))
                    downloadClicktrack(clicktrack, clicktrack.name);
                }}
              >
                Export
              </SettingsButton>
            </Setting>
          </SettingsSection>
          <SettingsPlayback {...{ settings, updateSettings }} />
          <SettingsGeneral {...{ settings, updateSettings }} />
        </div>
      </motion.div>
    </div>
  );
};

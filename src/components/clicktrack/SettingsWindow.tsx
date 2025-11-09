import { motion } from 'framer-motion';
import { Clicktrack } from '../../models/Clicktrack';
import { SettingsGeneral } from './SettingsGeneral';
import { SettingsPlayback } from './SettingsPlayback';
import { SettingsShare } from './SettingsShare';

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

  return (
    <div
      className="fixed left-0 top-0 z-[999999999] flex h-full max-h-screen w-screen items-center justify-center sm:px-2 sm:pb-2 sm:pt-14 "
      onClick={hideSettings}
    >
      <motion.div
        className="relative z-50 h-full w-full max-w-5xl overflow-y-scroll rounded-sm border-[1px] border-zinc-200 bg-white/70 p-8 shadow-2xl backdrop-blur-md dark:border-zinc-900 dark:bg-black/70"
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
          <SettingsPlayback {...{ settings, updateSettings }} />
          <SettingsGeneral {...{ settings, updateSettings }} />
        </div>
      </motion.div>
    </div>
  );
};

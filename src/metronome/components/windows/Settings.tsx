import { motion } from 'framer-motion';
import Clicktrack from '../../classes/clicktrack';

const Settings = ({
  settings,
  hideSettings,
  updateSettings,
}: {
  settings: Clicktrack['data'];
  hideSettings: () => void;
  updateSettings: (update: Partial<Clicktrack['data']>) => void;
}) => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center text-black dark:text-white">
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative z-50 max-w-5xl rounded-2xl border-[1px] border-neutral-300 bg-white/5 p-8 shadow-2xl backdrop-blur-md dark:border-neutral-800 dark:bg-black/50"
          onClick={hideSettings}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.1,
            type: 'spring',
            stiffness: 400,
            damping: 17,
          }}
        >
          <h1 className="mb-6 text-left text-3xl font-semibold">Settings</h1>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-4 text-xl">
              <button className="w-20 rounded-md bg-neutral-700 py-2 text-white">
                On
              </button>{' '}
              Volume
            </p>
            <p className="flex items-center gap-4 text-xl">
              <button
                onClick={() =>
                  updateSettings({ playExtraBeat: !settings.playExtraBeat })
                }
                className="w-20 rounded-md bg-neutral-700 py-2 text-white"
              >
                {settings.playExtraBeat ? 'On' : 'Off'}
              </button>{' '}
              Play Extra Beat
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Settings;

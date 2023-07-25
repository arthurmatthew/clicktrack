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
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center text-slate-950">
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative z-50 aspect-square max-w-5xl rounded-2xl bg-slate-200 p-8"
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
          <div className="flex flex-col gap-2 text-slate-950">
            <p className="flex items-center gap-4 text-xl">
              <button className="w-20 rounded-md bg-slate-700 py-2 text-slate-200">
                On
              </button>{' '}
              Volume
            </p>
            <p className="flex items-center gap-4 text-xl">
              <button
                onClick={() =>
                  updateSettings({ playExtraBeat: !settings.playExtraBeat })
                }
                className="w-20 rounded-md bg-slate-700 py-2 text-slate-200"
              >
                {settings.playExtraBeat ? 'On' : 'Off'}
              </button>{' '}
              Play Extra Beat
            </p>
          </div>
        </motion.div>
        <div className="absolute left-0 top-0 h-full w-full bg-black/30"></div>
      </motion.div>
    </div>
  );
};

export default Settings;

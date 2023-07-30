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
    <div className="fixed left-0 top-0 z-50 flex h-full max-h-screen w-screen items-center justify-center px-2 pb-2 pt-14 text-black dark:text-white">
      <motion.div
        className="relative z-50 h-full w-full max-w-5xl rounded-sm border-[1px] border-neutral-200 bg-white/5 p-8 shadow-2xl backdrop-blur-md dark:border-neutral-900 dark:bg-black/50"
        onClick={hideSettings}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <h1 className="mb-6 text-left text-3xl font-semibold">Settings</h1>
        <div className="flex flex-col gap-4">
          <SettingsSection name="Playback">
            <p className="flex items-center gap-4 text-xl">
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    updateSettings({ muted: !settings.muted });
                  }}
                  className="w-20 rounded-md bg-neutral-700 py-2 text-white"
                >
                  {settings.muted || settings.volume === 0 ? (
                    <i className="bi-volume-mute-fill" />
                  ) : (
                    <i className="bi-volume-up-fill" />
                  )}
                </button>{' '}
                <div
                  className={`flex gap-3 rounded-md bg-neutral-700 p-2 px-4 ${
                    settings.muted && 'opacity-50'
                  }`}
                >
                  <p className="roboto w-12 text-center">
                    {settings.volume}
                    <span className="inter">%</span>
                  </p>
                  <input
                    className="accent-purple-500"
                    disabled={settings.muted}
                    type="range"
                    value={settings.volume}
                    onChange={(e) =>
                      updateSettings({
                        volume: parseInt(e.currentTarget.value),
                      })
                    }
                    min={0}
                    max={150}
                  />
                </div>
              </div>
              Volume
            </p>
          </SettingsSection>
          <SettingsSection name="General">
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
          </SettingsSection>
        </div>
      </motion.div>
    </div>
  );
};

const SettingsSection = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-semibold uppercase text-white/50">{name}</h1>
      {children}
    </div>
  );
};

export default Settings;

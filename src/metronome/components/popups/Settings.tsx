import { motion } from 'framer-motion';
import Clicktrack from '../../classes/clicktrack';
import { useRef } from 'react';

const Settings = ({
  clicktrack,
  hideSettings,
  updateSettings,
}: {
  clicktrack: Clicktrack;
  hideSettings: () => void;
  updateSettings: (update: Partial<Clicktrack['data']>) => void;
}) => {
  const settings = clicktrack.data;

  const copyToClipboardRef = useRef<HTMLParagraphElement | null>(null);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyToClipboardRef.current?.innerText || '');
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full max-h-screen w-screen items-center justify-center px-2 pb-2 pt-14 text-black dark:text-white">
      <motion.div
        className="relative z-50 h-full w-full max-w-5xl rounded-sm border-[1px] border-neutral-200 bg-white/5 p-8 shadow-2xl backdrop-blur-md dark:border-neutral-900 dark:bg-black/50"
        onClick={hideSettings}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <h1 className="mb-6 text-left text-3xl font-semibold">Settings</h1>
        <div className="flex flex-col gap-4">
          <SettingsSection name="share">
            <p>
              Below is a copyable code which you can share with other users.
              They can use the code in the import section of the metronome list.
            </p>
            <div className="flex items-center gap-2">
              <SettingsButton onClick={copyToClipboard}>Copy</SettingsButton>
              <p
                ref={copyToClipboardRef}
                className="h-full max-w-sm overflow-hidden text-ellipsis rounded-sm rounded-b-none p-2 text-sm text-black/50 dark:text-white/20"
              >
                {btoa(JSON.stringify(clicktrack))}
              </p>
            </div>
          </SettingsSection>
          <SettingsSection name="Playback">
            <p className="flex items-center gap-4 text-xl">
              <div className="flex gap-1">
                <SettingsButton
                  onClick={() => {
                    updateSettings({ muted: !settings.muted });
                  }}
                >
                  {settings.muted || settings.volume === 0 ? (
                    <i className="bi-volume-mute-fill" />
                  ) : (
                    <i
                      className={`bi-volume-${
                        settings.volume > 80 ? 'up' : 'down'
                      }-fill`}
                    />
                  )}
                </SettingsButton>{' '}
                <div
                  className={`flex gap-3 rounded-md bg-neutral-200 p-2 px-4 dark:bg-neutral-900 ${
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
              <SettingsButton
                onClick={() =>
                  updateSettings({ playExtraBeat: !settings.playExtraBeat })
                }
              >
                {settings.playExtraBeat ? 'On' : 'Off'}
              </SettingsButton>{' '}
              Play Extra Beat
            </p>
          </SettingsSection>
        </div>
      </motion.div>
    </div>
  );
};

const SettingsButton = ({
  onClick,
  children,
}: {
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="min-w-[5rem] rounded-md border-[1px] border-neutral-300 bg-neutral-200 py-2 dark:border-neutral-700 dark:bg-neutral-900"
    >
      {children}
    </button>
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
      <h1 className="font-semibold uppercase text-black/50 dark:text-white/50">
        {name}
      </h1>
      {children}
    </div>
  );
};

export default Settings;

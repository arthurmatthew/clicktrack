import { motion } from 'framer-motion';
import { Clicktrack } from '../../clicktrack';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SettingsSection } from './SettingsSection';
import { SettingsButton } from './SettingsButton';

export const SettingsWindow = ({
  clicktrack,
  hideSettings,
  updateClicktrackData,
}: {
  clicktrack: Clicktrack;
  hideSettings: () => void;
  updateClicktrackData: (update: Partial<Clicktrack['data']>) => void;
}) => {
  const settings = clicktrack.data;

  const copyToClipboardRef = useRef<HTMLParagraphElement | null>(null);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyToClipboardRef.current?.innerText || '');
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full max-h-screen w-screen items-center justify-center  text-black dark:text-white sm:px-2 sm:pb-2 sm:pt-14 "
      onClick={hideSettings}
    >
      <motion.div
        className="relative z-50 h-full w-full max-w-5xl rounded-sm border-[1px] border-neutral-200 bg-white/70 p-8 shadow-2xl backdrop-blur-md dark:border-neutral-900 dark:bg-black/70"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
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
          <SettingsSection name="share">
            <p>
              You can paste the given code into the <b>Import</b> box in the{' '}
              <span className="underline">
                <Link target="blank" to="/app/clicktracks">
                  Clicktrack list
                </Link>
              </span>
              . Copy your code below. It's specific to each of your Clicktracks.
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
            <div className="flex items-center gap-4 text-xl">
              <div className="flex flex-grow flex-col gap-1 sm:flex-grow-0 sm:flex-row">
                <div className="flex items-center gap-4">
                  <SettingsButton
                    onClick={() => {
                      updateClicktrackData({ muted: !settings.muted });
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
                  </SettingsButton>
                  <p className="sm:hidden">Volume</p>
                </div>

                <div
                  className={`flex flex-grow gap-3 rounded-md bg-neutral-200 p-2 px-4 dark:bg-neutral-900 sm:flex-grow-0 ${
                    settings.muted && 'opacity-50'
                  }`}
                >
                  <p className="roboto w-12 text-center">
                    {settings.volume}
                    <span className="inter">%</span>
                  </p>
                  <input
                    className="w-full accent-purple-500"
                    disabled={settings.muted}
                    type="range"
                    value={settings.volume}
                    onChange={(e) =>
                      updateClicktrackData({
                        volume: parseInt(e.currentTarget.value),
                      })
                    }
                    min={0}
                    max={150}
                  />
                </div>
              </div>
              <p className="hidden sm:block">Volume</p>
            </div>
          </SettingsSection>
          <SettingsSection name="General">
            <p className="flex items-center gap-4 text-xl">
              <SettingsButton
                onClick={() =>
                  updateClicktrackData({
                    playExtraBeat: !settings.playExtraBeat,
                  })
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

import { ISettingsUpdater } from './ISettingsUpdater';
import { SettingsButton } from './SettingsButton';

export const SettingsPlaybackVolume = ({
  settings,
  updateSettings,
}: ISettingsUpdater) => {
  return (
    <div className="flex items-center gap-4 text-xl">
      <div className="flex flex-grow flex-col gap-1 sm:flex-grow-0 sm:flex-row">
        <div className="flex items-center gap-4">
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
            onChange={(e) => {
              updateSettings({
                volume: parseInt(e.currentTarget.value),
              });
            }}
            min={0}
            max={150}
          />
        </div>
      </div>
      <p className="hidden sm:block">Volume</p>
    </div>
  );
};

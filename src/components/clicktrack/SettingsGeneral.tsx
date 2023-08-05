import { ISettingsUpdater } from './ISettingsUpdater';
import { SettingsButton } from './SettingsButton';
import { SettingsSection } from './SettingsSection';

export const SettingsGeneral = ({
  settings,
  updateSettings,
}: ISettingsUpdater) => {
  return (
    <SettingsSection name="General">
      <p className="flex items-center gap-4 text-xl">
        <SettingsButton
          onClick={() =>
            updateSettings({
              playExtraBeat: !settings.playExtraBeat,
            })
          }
        >
          {settings.playExtraBeat ? 'On' : 'Off'}
        </SettingsButton>{' '}
        Play Extra Beat
      </p>
    </SettingsSection>
  );
};

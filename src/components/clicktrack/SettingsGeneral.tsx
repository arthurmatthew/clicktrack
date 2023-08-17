import { ISettingsUpdater } from './ISettingsUpdater';
import { Setting } from './Setting';
import { SettingsButton } from './SettingsButton';
import { SettingsSection } from './SettingsSection';

export const SettingsGeneral = ({
  settings,
  updateSettings,
}: ISettingsUpdater) => {
  return (
    <SettingsSection name="General">
      <Setting
        label="Play Extra Beat"
        description="Clicktrack will play the downbeat of an extra measure if this setting is enabled."
      >
        <SettingsButton
          onClick={() => {
            updateSettings({
              playExtraBeat: !settings.playExtraBeat,
            });
          }}
        >
          {settings.playExtraBeat ? 'On' : 'Off'}
        </SettingsButton>
      </Setting>
    </SettingsSection>
  );
};

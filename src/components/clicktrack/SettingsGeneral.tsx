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
        label="Show Save Indicator"
        description="Enable the little dot that shows on the save button when unsaved changes are present."
      >
        <SettingsButton
          onClick={() => {
            updateSettings({ showSaveIndicator: !settings.showSaveIndicator });
          }}
        >
          {settings.showSaveIndicator ? 'On' : 'Off'}
        </SettingsButton>
      </Setting>
      <Setting
        disabled={settings.showSaveIndicator === false}
        label="Animate Save Indicator"
      >
        <SettingsButton
          onClick={() => {
            updateSettings({
              animateSaveIndicator: !settings.animateSaveIndicator,
            });
          }}
        >
          {settings.animateSaveIndicator ? 'On' : 'Off'}
        </SettingsButton>
      </Setting>
      <Setting
        disabled={settings.showSaveIndicator === false}
        label="Flash Play Button"
        description="Flash the color of the play button on accented beats."
      >
        <SettingsButton
          onClick={() => {
            updateSettings({
              flashPlayButton: !settings.flashPlayButton,
            });
          }}
        >
          {settings.flashPlayButton ? 'On' : 'Off'}
        </SettingsButton>
      </Setting>
    </SettingsSection>
  );
};

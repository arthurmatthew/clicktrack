import { SettingsButton } from './SettingsButton';
import { SettingsSection } from './SettingsSection';
import { useShareClicktrack } from '../../hooks/useShareClicktrack';
import { Clicktrack } from '../../models/Clicktrack';
import { Setting } from './Setting';
import { downloadClicktrack } from '../../metronome/renderClicktrack';
import { validatePlay } from '../../utils/validators/validatePlay';
import { useNotify } from '../../hooks/useNotify';

interface ISettingsShare {
  clicktrack: Clicktrack;
}

export const SettingsShare = ({ clicktrack }: ISettingsShare) => {
  const { sharingCode, copyToClipboard } = useShareClicktrack(clicktrack);
  const { notify } = useNotify();

  return (
    <SettingsSection name="share">
      <p>
        You can paste the given code into the <b>Import</b> box in the{' '}
        <span className="underline">
          <a target="blank" href="/app/clicktracks">
            Clicktrack list
          </a>
        </span>
        . Copy your code below. It&apos;s specific to each of your Clicktracks.
      </p>
      <div className="flex items-center gap-2">
        <SettingsButton
          onClick={() => {
            void copyToClipboard();
          }}
        >
          Copy
        </SettingsButton>
        <p className="h-full max-w-sm overflow-hidden rounded-sm rounded-b-none p-2 text-sm text-ellipsis text-black/50 dark:text-white/20">
          {sharingCode}
        </p>
      </div>
      <Setting
        label="Render - Experimental"
        description="Download a rendered version of your Clicktrack."
      >
        <SettingsButton
          onClick={() => {
            if (validatePlay(clicktrack.data.sections, notify))
              downloadClicktrack(clicktrack, clicktrack.name);
          }}
        >
          Download
        </SettingsButton>
      </Setting>
    </SettingsSection>
  );
};

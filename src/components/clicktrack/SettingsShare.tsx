import { SettingsButton } from './SettingsButton';
import { SettingsSection } from './SettingsSection';
import { useShareClicktrack } from '../../hooks/useShareClicktrack';
import { Clicktrack } from '../../models/Clicktrack';
import { useClicktracks } from '../../hooks/useClicktracks';
import { Dispatch, SetStateAction, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { useNotify } from '../../hooks/useNotify';

interface ISettingsShare {
  clicktrack: Clicktrack;
  link: string | undefined;
  setLink: Dispatch<SetStateAction<string | undefined>>;
}

export const SettingsShare = ({
  clicktrack,
  link,
  setLink,
}: ISettingsShare) => {
  const { sharingCode, copyToClipboard } = useShareClicktrack(clicktrack);
  const { handleShare } = useClicktracks();
  const [loading, setLoading] = useState(false);
  const { user, initialized } = useUser();
  const { notify } = useNotify();

  const handleGenerateLink = async () => {
    setLoading(true);
    const generated = await handleShare(clicktrack.id);
    setLink(generated);
    setLoading(false);
  };

  const handleCopyLink = async () => {
    if (link === undefined) return;
    await navigator.clipboard.writeText(link);
    notify('Share link copied to clipboard!', 'info');
  };

  return (
    <SettingsSection name="share">
      <div
        className={`items-center gap-4 ${!initialized || !user ? 'hidden' : 'flex'}`}
      >
        {link ? (
          <SettingsButton
            disabled={!initialized || !user}
            onClick={handleCopyLink}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          >
            Copy
          </SettingsButton>
        ) : (
          <SettingsButton
            disabled={!initialized || !user}
            onClick={handleGenerateLink}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Get Link'}
          </SettingsButton>
        )}
        <p className="opacity-75">{link ?? 'Link not yet generated'}</p>
      </div>

      <p>
        Paste the given code into the <b>Import</b> box in the{' '}
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
    </SettingsSection>
  );
};

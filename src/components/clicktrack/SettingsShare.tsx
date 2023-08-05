import { Link } from 'react-router-dom';
import { SettingsButton } from './SettingsButton';
import { SettingsSection } from './SettingsSection';
import { useClicktrackCode } from '../../hooks/useClicktrackCode';
import { Clicktrack } from '../../models/clicktrack/Clicktrack';

interface ISettingsShare {
  clicktrack: Clicktrack;
}

export const SettingsShare = ({ clicktrack }: ISettingsShare) => {
  const { code, copyToClipboard } = useClicktrackCode(clicktrack);

  return (
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
        <p className="h-full max-w-sm overflow-hidden text-ellipsis rounded-sm rounded-b-none p-2 text-sm text-black/50 dark:text-white/20">
          {code}
        </p>
      </div>
    </SettingsSection>
  );
};

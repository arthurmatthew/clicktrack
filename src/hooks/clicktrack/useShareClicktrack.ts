import { Clicktrack } from '../../models/Clicktrack';
import { useNotify } from '../useNotify';

export const useShareClicktrack = (clicktrack: Clicktrack) => {
  const { notify } = useNotify();

  const sharingCode = Clicktrack.encode(clicktrack);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(sharingCode);
    notify('Copied to clipboard.', 'info');
  };

  return { sharingCode, copyToClipboard };
};

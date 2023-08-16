import { Clicktrack } from '../../models/Clicktrack';
import { useNotify } from '../useNotify';

export const useShareClicktrack = (clicktrack: Clicktrack) => {
  const { notify } = useNotify();

  const sharingCode = btoa(JSON.stringify(clicktrack));
  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharingCode);
    notify('Copied to clipboard.', 'info');
  };

  return { sharingCode, copyToClipboard };
};

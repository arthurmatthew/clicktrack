import { Clicktrack } from '../../models/Clicktrack';

export const useShareClicktrack = (clicktrack: Clicktrack) => {
  const sharingCode = btoa(JSON.stringify(clicktrack));
  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharingCode);
  };

  return { sharingCode, copyToClipboard };
};

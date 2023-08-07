import { Clicktrack } from '../models/clicktrack/Clicktrack';

export const useClicktrackCode = (clicktrack: Clicktrack) => {
  const code = btoa(JSON.stringify(clicktrack));
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return { code, copyToClipboard };
};
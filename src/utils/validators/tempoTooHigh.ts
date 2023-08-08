import { CLICKTRACK_MAX_BPM } from '../../config';

export const tempoTooHigh = (amount: number) => {
  if (amount <= CLICKTRACK_MAX_BPM) return false;

  console.error('Your tempo cannot be above ' + CLICKTRACK_MAX_BPM);
  return true;
};

import { CLICKTRACK_MIN_BPM } from '../../config';

export const tempoTooLow = (amount: number) => {
  if (amount >= CLICKTRACK_MIN_BPM) return false;

  console.error('Your tempo cannot be below ' + CLICKTRACK_MIN_BPM);
  return true;
};

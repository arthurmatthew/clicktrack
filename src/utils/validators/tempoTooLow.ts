import { CLICKTRACK_MIN_BPM } from '../../config';
import { TNotify } from '../../types';

export const tempoTooLow = (amount: number, notify: TNotify) => {
  if (amount >= CLICKTRACK_MIN_BPM) return false;

  notify('Your tempo cannot be below ' + CLICKTRACK_MIN_BPM, 'error');
  return true;
};

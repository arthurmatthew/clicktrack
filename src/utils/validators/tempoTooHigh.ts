import { CLICKTRACK_MAX_BPM } from '../../config';
import { TNotify } from '../../types';

export const tempoTooHigh = (amount: number, notify: TNotify) => {
  if (amount <= CLICKTRACK_MAX_BPM) return false;

  notify('Your tempo cannot be above ' + CLICKTRACK_MAX_BPM, 'warning');
  return true;
};

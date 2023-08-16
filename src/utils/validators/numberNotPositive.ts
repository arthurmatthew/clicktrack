import { TNotify } from '../../types';

export const numberNotPositive = (number: number, notify: TNotify) => {
  if (number > 0) return false;

  notify('This value must be positive.', 'warning');
  return true;
};

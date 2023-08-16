import { TNotify } from '../../types';

export const numberNotIntegral = (amount: number, notify: TNotify) => {
  if (Number.isSafeInteger(amount)) return false;

  notify('This value must be a whole number.', 'warning');
  return true;
};

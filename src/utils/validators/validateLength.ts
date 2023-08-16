import { TNotify } from '../../types';
import { numberNotPositive } from './numberNotPositive';

export const validateLength = (number: number, notify: TNotify) => {
  if (numberNotPositive(number, notify)) return false;

  return true;
};

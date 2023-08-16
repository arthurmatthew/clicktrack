import { TNotify } from '../../types';
import { numberNotIntegral } from './numberNotIntergral';
import { numberNotPositive } from './numberNotPositive';

export const validateTimeSignature = (number: number, notify: TNotify) => {
  if (numberNotPositive(number, notify)) return false;
  if (numberNotIntegral(number, notify)) return false;
  if (number > 32) {
    notify('Your denominator cannot be higher than 32.', 'warning');
    return false;
  }

  return true;
};

import { numberNotPositive } from './numberNotPositive';

export const validateTimeSignature = (number: number) => {
  if (numberNotPositive(number)) return false;

  return true;
};

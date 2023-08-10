import { numberNotPositive } from './numberNotPositive';

export const validateLength = (number: number) => {
  if (numberNotPositive(number)) return false;

  return true;
};

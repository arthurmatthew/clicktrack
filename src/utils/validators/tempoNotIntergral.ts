import { TNotify } from '../../types';

export const tempoNotIntegral = (amount: number, notify: TNotify) => {
  if (Number.isSafeInteger(amount)) return false;

  notify(
    "Your tempo must be a whole number. We've gone ahead and updated it for you.",
    'warning'
  );
  return true;
};

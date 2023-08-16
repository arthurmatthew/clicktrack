import { CLICKTRACK_MAX_BPM, CLICKTRACK_MIN_BPM } from '../../config';
import { TNotify } from '../../types';
import { tempoNotIntegral } from './tempoNotIntergral';
import { tempoTooHigh } from './tempoTooHigh';
import { tempoTooLow } from './tempoTooLow';

export const validateTempo = (amount: number, notify: TNotify) => {
  const roundedTempo = Math.ceil(amount);

  if (tempoTooHigh(roundedTempo, notify)) return CLICKTRACK_MAX_BPM;
  if (tempoTooLow(roundedTempo, notify)) return CLICKTRACK_MIN_BPM;
  if (tempoNotIntegral(amount, notify)) return roundedTempo;

  return roundedTempo;
};

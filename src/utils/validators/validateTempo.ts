import { CLICKTRACK_MAX_BPM, CLICKTRACK_MIN_BPM } from '../../config';
import { tempoNotIntegral } from './tempoNotIntergral';
import { tempoTooHigh } from './tempoTooHigh';
import { tempoTooLow } from './tempoTooLow';

export const validateTempo = (amount: number) => {
  const roundedTempo = Math.ceil(amount);

  if (tempoTooHigh(roundedTempo)) return CLICKTRACK_MAX_BPM;
  if (tempoTooLow(roundedTempo)) return CLICKTRACK_MIN_BPM;
  if (tempoNotIntegral(amount)) return roundedTempo;

  return roundedTempo;
};

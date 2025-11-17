import { TAccentLevels } from '../types';

const ACCENT_PRESETS: Record<string, number[]> = {
  '2/4': [3, 0, 0, 0, 2, 0, 0, 0],
  '3/4': [3, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  '4/4': [3, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
  '5/4': [3, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],

  '6/8': [3, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0],
  '9/8': [3, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0],
  '12/8': [
    3, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0,
  ],

  '5/8': [3, 0, 1, 0, 1, 0, 2, 0, 1, 0],
  '7/8': [3, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 1, 0],
};

export const generateAccentMap = (
  beatsPerBar: number,
  beatValue: number,
  subdivisionDenominator: number = 16,
): TAccentLevels[] => {
  const timeSignature = `${beatsPerBar}/${beatValue}`;

  if (ACCENT_PRESETS[timeSignature]) {
    return ACCENT_PRESETS[timeSignature] as TAccentLevels[];
  }

  const subdivisionsPerBeat = subdivisionDenominator / beatValue;
  const totalSubdivisions = beatsPerBar * subdivisionsPerBeat;

  return Array.from({ length: totalSubdivisions }, (_, i) => {
    const beatPosition = Math.floor(i / subdivisionsPerBeat);
    const subdivisionPosition = i % subdivisionsPerBeat;

    // Only accent the start of each beat
    if (subdivisionPosition !== 0) return 0;

    // Downbeat
    if (i === 0) return 3;

    // For 4-beat meters, accent beat 3
    if (beatsPerBar === 4 && beatPosition === 2) return 2;

    // For other meters, secondary accent on halfway point
    if (beatPosition === Math.floor(beatsPerBar / 2)) return 2;

    // All other beats
    return 2;
  }) as TAccentLevels[];
};

import { TCurveTypes } from '../types';

export const getEffectiveBpm = (
  fromBpm: number,
  toBpm: number,
  lengthInBars: number,
  timeSignature: [number, number],
  curveType: TCurveTypes,
  totalBarsPlayed: number,
  current16thBeat: number
) => {
  const quarterNotesPerBar = timeSignature[0] / (timeSignature[1] / 4);
  const total16thNotesInSection = lengthInBars * quarterNotesPerBar * 4;

  // calculate 16ths into section
  const current16thIndex =
    totalBarsPlayed * quarterNotesPerBar * 4 + current16thBeat;
  const rawProgress = current16thIndex / (total16thNotesInSection - 1);

  const transition =
    curveType === 'ease-in'
      ? rawProgress * rawProgress
      : curveType === 'ease-out'
      ? 1 - (1 - rawProgress) * (1 - rawProgress)
      : rawProgress;

  const currentBpm = fromBpm + transition * (toBpm - fromBpm);
  return currentBpm;
};

import {
  CLICKTRACK_MAX_BPM,
  CLICKTRACK_MIN_BPM,
  TEMPO_TAPPER_COOLDOWN_TIME,
  TEMPO_TAPPER_MAX_SAMPLE_SIZE,
} from '../config';
import { Metronome } from '../models/Metronome';

export const useTempoTapper = (
  metronome: Metronome | undefined,
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void
) => {
  const tempoTapTimes: number[] = [];
  let tempoTapTimer: number;

  const tapTempo = () => {
    if (!metronome) return;

    tempoTapTimes.push(Date.now());

    const enoughTaps = tempoTapTimes.length > 1;
    const tapDifferences = enoughTaps
      ? (tempoTapTimes
          .map((timeAtTap, index) => {
            const nextTimeAtTap = tempoTapTimes[index + 1];
            if (nextTimeAtTap) return nextTimeAtTap - timeAtTap;
          })
          .filter((timeAtTap) => timeAtTap) as number[])
      : undefined;

    if (tapDifferences) {
      const tapTimesSample = tapDifferences.slice(
        -TEMPO_TAPPER_MAX_SAMPLE_SIZE
      );
      const tapTimesSampleSum = tapTimesSample.reduce((a, b) => a + b);
      const tapTimesSampleSize = tapDifferences.slice(
        -TEMPO_TAPPER_MAX_SAMPLE_SIZE
      ).length;
      const averageTapDifference = tapTimesSampleSum / tapTimesSampleSize;
      const averageTapDifferenceInSeconds = averageTapDifference / 1000;

      const averageBpm = Math.ceil(60 / averageTapDifferenceInSeconds);

      if (averageBpm > CLICKTRACK_MAX_BPM)
        updateMetronome(metronome, { bpm: CLICKTRACK_MAX_BPM });
      else if (averageBpm < CLICKTRACK_MIN_BPM)
        updateMetronome(metronome, { bpm: CLICKTRACK_MIN_BPM });
      else updateMetronome(metronome, { bpm: averageBpm });
    }

    if (tempoTapTimer) clearTimeout(tempoTapTimer);
    tempoTapTimer = window.setTimeout(() => {
      tempoTapTimes.length = 0;
    }, TEMPO_TAPPER_COOLDOWN_TIME * 1000);
  };

  return { tapTempo };
};

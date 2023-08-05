import { CLICKTRACK_MAX_BPM, CLICKTRACK_MIN_BPM } from '../config';
import { Metronome } from '../models/clicktrack/Metronome';

export const useTempoTapper = (
  metronome: Metronome | undefined,
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void
) => {
  const tempoTapTimes: number[] = [];
  let tempoTapTimer: number;
  const tapTempo = () => {
    if (!metronome) return;

    tempoTapTimes.push(Date.now());

    const tapDifferences =
      tempoTapTimes.length > 1 &&
      (tempoTapTimes
        .map((timeAtTap, index) => {
          const nextTimeAtTap = tempoTapTimes[index + 1];
          if (nextTimeAtTap) return nextTimeAtTap - timeAtTap;
        })
        .filter((timeAtTap) => timeAtTap) as number[]);

    if (tapDifferences) {
      const averageTapDifference =
        tapDifferences.slice(-4).reduce((a, b) => a + b) /
        tapDifferences.slice(-4).length;
      const averageBpm = Math.ceil(60 / (averageTapDifference / 1000));

      if (averageBpm > CLICKTRACK_MAX_BPM)
        updateMetronome(metronome, { bpm: CLICKTRACK_MAX_BPM });
      else if (averageBpm < CLICKTRACK_MIN_BPM)
        updateMetronome(metronome, { bpm: CLICKTRACK_MIN_BPM });
      else updateMetronome(metronome, { bpm: averageBpm });
    }

    if (tempoTapTimer) clearTimeout(tempoTapTimer);
    tempoTapTimer = setTimeout(() => {
      tempoTapTimes.length = 0;
    }, 2000);
  };

  return { tapTempo };
};

import { CLICKTRACK_MAX_BPM, CLICKTRACK_MIN_BPM } from '../../config';
import { Metronome } from '../../models/clicktrack/Metronome';

interface ITempoIncrementButton {
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void;
  selected: Metronome;
  amount: number;
  icon: string;
}

export const TempoIncrementButton = ({
  updateMetronome,
  selected,
  amount,
  icon,
}: ITempoIncrementButton) => {
  return (
    <i
      onClick={() => {
        if (selected.bpm + amount < CLICKTRACK_MIN_BPM) {
          updateMetronome(selected, { bpm: CLICKTRACK_MIN_BPM });
          return;
        }
        if (selected.bpm + amount > CLICKTRACK_MAX_BPM) {
          updateMetronome(selected, { bpm: CLICKTRACK_MAX_BPM });
          return;
        }
        updateMetronome(selected, {
          bpm: selected.bpm + amount,
        });
      }}
      className={`bi-${icon} flex flex-grow cursor-pointer items-center justify-center border-x-[1px] border-white bg-neutral-200 py-2 text-2xl tracking-tighter duration-75 hover:text-purple-400 dark:border-black dark:bg-neutral-900 dark:hover:text-purple-700`}
    />
  );
};

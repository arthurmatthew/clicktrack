import { CLICKTRACK_MAX_BPM, CLICKTRACK_MIN_BPM } from '../../config';
import { Metronome } from '../../models/clicktrack/Metronome';

interface TempoMultiplyButton {
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void;
  selected: Metronome;
  degree: number;
  label: string;
}

export const TempoMultiplyButton = ({
  updateMetronome,
  selected,
  degree,
  label,
}: TempoMultiplyButton) => {
  return (
    <p
      onClick={() => {
        if (selected.bpm * degree < CLICKTRACK_MIN_BPM) {
          updateMetronome(selected, { bpm: CLICKTRACK_MIN_BPM });
          return;
        }
        if (selected.bpm * degree > CLICKTRACK_MAX_BPM) {
          updateMetronome(selected, { bpm: CLICKTRACK_MAX_BPM });
          return;
        }
        updateMetronome(selected, {
          bpm: selected.bpm * degree,
        });
      }}
      className="flex flex-grow cursor-pointer items-center justify-center border-x-[1px] border-white bg-neutral-200 py-2 text-lg duration-75 hover:text-purple-400 dark:border-black dark:bg-neutral-900 dark:hover:text-purple-700"
    >
      {label}
    </p>
  );
};

import { Metronome } from '../../models/Metronome';
import { validateTempo } from '../../utils/validators/validateTempo';

interface ITempoMultiplyButton {
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
}: ITempoMultiplyButton) => {
  return (
    <p
      onClick={() => {
        updateMetronome(selected, {
          bpm: validateTempo(selected.bpm * degree),
        });
      }}
      className="flex flex-grow cursor-pointer items-center justify-center border-x-[1px] border-white bg-neutral-200 py-2 text-lg duration-75 hover:text-purple-400 dark:border-black dark:bg-neutral-900 dark:hover:text-purple-700"
    >
      {label}
    </p>
  );
};

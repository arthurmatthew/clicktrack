import { useNotify } from '../../hooks/useNotify';
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
  const { notify } = useNotify();

  return (
    <p
      onClick={() => {
        updateMetronome(selected, {
          bpm: validateTempo(selected.bpm * degree, notify),
        });
      }}
      className="over:bg-zinc-900 flex flex-grow cursor-pointer items-center justify-center border-x-[1px] border-white bg-zinc-200 py-2 text-lg duration-75 hover:bg-zinc-900 hover:text-white dark:border-black dark:bg-zinc-900 dark:hover:bg-zinc-200 dark:hover:text-black"
    >
      {label}
    </p>
  );
};

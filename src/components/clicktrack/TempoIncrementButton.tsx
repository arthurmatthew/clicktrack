import { useNotify } from '../../hooks/useNotify';
import { Metronome } from '../../models/Metronome';
import { validateTempo } from '../../utils/validators/validateTempo';

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
  const { notify } = useNotify();

  return (
    <i
      onClick={() => {
        updateMetronome(selected, {
          bpm: validateTempo(selected.bpm + amount, notify),
        });
      }}
      className={`bi-${icon} flex flex-grow cursor-pointer items-center justify-center border-x-[1px] border-white bg-zinc-200 py-2 text-2xl tracking-tighter duration-75 hover:bg-zinc-900 hover:text-white dark:border-black dark:bg-zinc-900 dark:hover:bg-zinc-200 dark:hover:text-black`}
    />
  );
};

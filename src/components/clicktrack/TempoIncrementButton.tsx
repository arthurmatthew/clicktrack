import { Metronome } from '../../models/clicktrack/Metronome';
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
  return (
    <i
      onClick={() => {
        updateMetronome(selected, {
          bpm: validateTempo(selected.bpm + amount),
        });
      }}
      className={`bi-${icon} flex flex-grow cursor-pointer items-center justify-center border-x-[1px] border-white bg-neutral-200 py-2 text-2xl tracking-tighter duration-75 hover:text-purple-400 dark:border-black dark:bg-neutral-900 dark:hover:text-purple-700`}
    />
  );
};

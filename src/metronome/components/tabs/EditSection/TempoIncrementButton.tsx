import { Metronome } from '../../../classes/section';

export const TempoIncrementButton = ({
  updateMetronome,
  selected,
  amount,
  icon,
}: {
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void;
  selected: Metronome;
  amount: number;
  icon: string;
}) => {
  return (
    <i
      onClick={() => {
        if (selected.bpm + amount < 20) {
          updateMetronome(selected, { bpm: 20 });
          return;
        }
        if (selected.bpm + amount > 500) {
          updateMetronome(selected, { bpm: 500 });
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

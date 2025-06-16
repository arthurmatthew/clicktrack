import { Transition } from '../../models/Transition';

export const SequencerListTransition = ({
  transition,
  setSelectedId,
  selected,
}: {
  transition: Transition;
  selected: boolean;
  setSelectedId: (id: string) => void;
}) => {
  return (
    <div
      className="group flex cursor-pointer items-center gap-2"
      onClick={() => {
        setSelectedId(transition.id);
      }}
    >
      <div
        className={`relative flex w-full gap-3 p-4 py-3 duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
          selected && 'py-6'
        }`}
      >
        <i
          className={`bi-speedometer z-10 ${
            selected && 'px-2 text-3xl text-purple-500'
          } duration-150`}
        />{' '}
        <p className="relative z-10">
          Transition for {transition.lengthInBars} bars
        </p>
        <div
          className={`absolute left-0 top-0 h-full w-full bg-zinc-100 duration-75 dark:bg-zinc-800 ${
            !selected && 'hidden'
          }`}
        />
      </div>
    </div>
  );
};

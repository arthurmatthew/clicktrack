import { Metronome } from '../../models/clicktrack/Metronome';

export const SequencerListMetronome = ({
  metronome,
  setSelectedId,
  selected,
}: {
  metronome: Metronome;
  selected: boolean;
  setSelectedId: (id: string) => void;
}) => {
  return (
    <div
      className="group flex cursor-pointer items-center gap-2"
      onClick={() => setSelectedId(metronome.id)}
    >
      <div
        className={`relative flex w-full gap-3 p-4 py-3 duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
          selected && 'py-6'
        }`}
      >
        <i
          className={`bi-music-note-beamed z-10 ${
            selected && 'px-2 text-3xl text-purple-500'
          } duration-150`}
        />{' '}
        <p className="relative z-10">
          {Metronome.convertTempoToTempoIndicator(metronome.bpm)} for{' '}
          {metronome.lengthInBars} bars
        </p>
        <div
          className={`absolute left-0 top-0 h-full w-full bg-neutral-100 duration-75 dark:bg-neutral-800 ${
            !selected && 'hidden'
          }`}
        />
      </div>
    </div>
  );
};

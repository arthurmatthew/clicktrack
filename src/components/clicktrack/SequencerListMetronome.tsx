import { Metronome } from '../../models/Metronome';

export const SequencerListMetronome = ({
  metronome,
  setSelectedId,
  selected,
  copySection,
  deleteSection,
}: {
  metronome: Metronome;
  selected: boolean;
  setSelectedId: (id: string) => void;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
}) => {
  return (
    <div
      className="group flex cursor-pointer items-center gap-2"
      onClick={() => {
        setSelectedId(metronome.id);
      }}
    >
      <div
        className={`relative flex w-full items-center justify-between px-4 duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
          selected && 'py-1'
        }`}
      >
        <div className="flex gap-3 py-3">
          <i
            className={`bi-music-note-beamed z-10 ${
              selected && 'px-2 text-3xl text-purple-500'
            } duration-150`}
          />{' '}
          <p className="relative z-10 flex items-center gap-2">
            <span className="font-semibold">{metronome.lengthInBars}</span> bars
            of{' '}
            <div
              className={`lora flex flex-col items-center px-1 font-black ${
                !selected && 'text-sm'
              }`}
            >
              <span className="leading-none">{metronome.timeSignature[0]}</span>
              <span className="leading-none">{metronome.timeSignature[1]}</span>
            </div>{' '}
            at <span className="font-semibold">{metronome.bpm}</span> BPM
          </p>
        </div>
        <div className="hidden h-fit gap-2 group-hover:flex">
          <button
            className={`group/button z-10 flex items-center justify-center rounded-lg border-[2px] border-dashed border-zinc-300 border-opacity-20 hover:border-opacity-100 ${
              selected ? 'h-12 w-12' : 'h-8 w-8'
            }`}
            onClick={() => copySection(metronome.id)}
          >
            <i
              className={`bi-copy text-zinc-300 opacity-20 group-hover/button:opacity-100 ${
                selected ? 'text-3xl' : 'text-lg'
              }`}
            />
          </button>
          <button
            className={`group/button z-10 flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 border-opacity-20 hover:border-opacity-100 ${
              selected ? 'h-12 w-12' : 'h-8 w-8'
            }`}
            onClick={() => deleteSection(metronome.id)}
          >
            <i
              className={`bi-trash text-zinc-300 opacity-20 group-hover/button:opacity-100 ${
                selected ? 'text-3xl' : 'text-lg'
              }`}
            />
          </button>
        </div>

        <div
          className={`absolute left-0 top-0 h-full w-full bg-zinc-100 duration-75 dark:bg-zinc-800 ${
            !selected && 'hidden'
          }`}
        />
      </div>
    </div>
  );
};

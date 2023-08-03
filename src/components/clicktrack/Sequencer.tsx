import { Clicktrack } from '../../models/clicktrack/Clicktrack';
import { Metronome } from '../../models/clicktrack/Metronome';
import { Repeat } from '../../models/clicktrack/Repeat';

interface ISequencer {
  add: (child: Clicktrack['data']['children'][number]) => void;
  selectedId: string;
  setSelectedId: (id: string) => void;
  sequence: Clicktrack['data']['children'];
}

export const Sequencer = ({
  add,
  selectedId,
  setSelectedId,
  sequence,
}: ISequencer) => {
  return (
    <div className="flex select-none flex-col gap-2  ">
      <div className="rounded-2 flex flex-col text-xl">
        {sequence.map((section) => {
          const selected = section.id === selectedId;
          if (section instanceof Metronome)
            return (
              <ListMetronome
                key={section.id}
                selected={selected}
                setSelectedId={setSelectedId}
                metronome={section as Metronome}
              />
            );
          if (section instanceof Repeat)
            return (
              <ListRepeat
                key={section.id}
                selected={selected}
                setSelectedId={setSelectedId}
                repeat={section as Repeat}
              />
            );
        })}
        <div className="m-3 grid grid-cols-2 items-center gap-3">
          <div
            onClick={() => add(new Metronome())}
            className="w-full cursor-pointer rounded-sm border-[1px] border-neutral-300 p-4 py-3 dark:border-neutral-900"
          >
            Add a Section
          </div>
          <div
            onClick={() => add(new Repeat())}
            className="w-full cursor-pointer rounded-sm border-[1px] border-neutral-300 p-4 py-3 dark:border-neutral-900"
          >
            Add a Repeat
          </div>
        </div>
      </div>
    </div>
  );
};

const ListMetronome = ({
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
        <i className="bi-music-note-list z-10" />{' '}
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

const ListRepeat = ({
  repeat,
  setSelectedId,
  selected,
}: {
  repeat: Repeat;
  selected: boolean;
  setSelectedId: (id: string) => void;
}) => {
  return (
    <div
      className="group flex cursor-pointer items-center gap-2"
      onClick={() => setSelectedId(repeat.id)}
    >
      <div
        className={`relative flex w-full gap-3 p-4 py-3 duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
          selected && 'py-6'
        }`}
      >
        <i className="bi-repeat z-10" />
        <p className="relative z-10">
          Repeat{' '}
          {repeat.infinite
            ? 'forever'
            : `${repeat.times} time${repeat.times > 1 ? 's' : ''}`}
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

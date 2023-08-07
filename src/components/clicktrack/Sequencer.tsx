import { Clicktrack } from '../../models/clicktrack/Clicktrack';
import { Metronome } from '../../models/clicktrack/Metronome';
import { Repeat } from '../../models/clicktrack/Repeat';
import { SequencerControls } from './SequencerControls';
import { SequencerListMetronome } from './SequencerListMetronome';
import { SequencerListRepeat } from './SequencerListRepeat';

interface ISequencer {
  add: (child: Clicktrack['data']['sections'][number]) => void;
  selectedId: string;
  setSelectedId: (id: string) => void;
  sequence: Clicktrack['data']['sections'];
}

export const Sequencer = ({
  add,
  selectedId,
  setSelectedId,
  sequence,
}: ISequencer) => {
  return (
    <div className="flex h-full select-none flex-col gap-2">
      <div className="rounded-2 flex h-full flex-col text-xl">
        {sequence.map((section) => {
          const selected = section.id === selectedId;
          if (section instanceof Metronome)
            return (
              <SequencerListMetronome
                key={section.id}
                selected={selected}
                setSelectedId={setSelectedId}
                metronome={section as Metronome}
              />
            );
          if (section instanceof Repeat)
            return (
              <SequencerListRepeat
                key={section.id}
                selected={selected}
                setSelectedId={setSelectedId}
                repeat={section as Repeat}
              />
            );
        })}
      </div>
      <SequencerControls
        addMetronome={() => add(new Metronome())}
        addRepeat={() => add(new Repeat())}
      />
    </div>
  );
};

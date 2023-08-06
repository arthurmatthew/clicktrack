import { IMetronomeUpdater } from './IMetronomeUpdater';
import { TempoIncrementers } from './TempoIncrementers';
import { TempoTapper } from './TempoTapper';

interface IEditTimeSignature extends IMetronomeUpdater {
  tapTempo: () => void;
}

export const EditTempo = ({
  metronome,
  updateMetronome,
  tapTempo,
}: IEditTimeSignature) => {
  return (
    <div className="flex gap-2">
      <TempoIncrementers {...{ metronome, updateMetronome }} />
      <TempoTapper tapTempo={tapTempo} />
    </div>
  );
};

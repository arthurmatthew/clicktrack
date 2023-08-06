import { Metronome } from '../../models/clicktrack/Metronome';
import { useTempoTapper } from '../../hooks/useTempoTapper';
import { EditLength } from './EditLength';
import { EditTempo } from './EditTempo';
import { EditTimeSignature } from './EditTimeSignature';
import { EditCustomTimeSignature } from './EditCustomTimeSignature';

interface IEditMetronome {
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void;
  metronome: Metronome | undefined;
}

export const EditMetronome = ({
  updateMetronome,
  metronome,
}: IEditMetronome) => {
  const { tapTempo } = useTempoTapper(metronome, updateMetronome);

  if (metronome)
    return (
      <div className="grid items-center gap-2">
        <EditTempo {...{ metronome, updateMetronome, tapTempo }} />
        <EditTimeSignature {...{ metronome, updateMetronome }} />
        <div className="flex flex-col gap-px overflow-hidden rounded-sm sm:flex-row sm:gap-2 sm:overflow-visible sm:rounded-none">
          <EditLength {...{ metronome, updateMetronome }} />
          <EditCustomTimeSignature {...{ metronome, updateMetronome }} />
        </div>
      </div>
    );
};

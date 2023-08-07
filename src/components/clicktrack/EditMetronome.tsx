import { Metronome } from '../../models/clicktrack/Metronome';
import { useTempoTapper } from '../../hooks/useTempoTapper';
import { EditLength } from './EditLength';
import { EditTempo } from './EditTempo';
import { EditTimeSignature } from './EditTimeSignature';
import { EditCustomTimeSignature } from './EditCustomTimeSignature';
import { motion } from 'framer-motion';

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
      <motion.div
        className="grid items-center gap-2"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
      >
        <EditTempo {...{ metronome, updateMetronome, tapTempo }} />
        <EditTimeSignature {...{ metronome, updateMetronome }} />
        <div className="flex gap-2 overflow-hidden rounded-sm sm:overflow-visible sm:rounded-none">
          <EditLength {...{ metronome, updateMetronome }} />
          <EditCustomTimeSignature {...{ metronome, updateMetronome }} />
        </div>
      </motion.div>
    );
};

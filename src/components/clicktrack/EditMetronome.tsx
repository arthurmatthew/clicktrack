import { Metronome } from '../../models/Metronome';
import { useTempoTapper } from '../../hooks/useTempoTapper';
import { EditLength } from './EditLength';
import { EditTempo } from './EditTempo';
import { EditTimeSignature } from './EditTimeSignature';
import { motion } from 'framer-motion';
import { EditVolume } from './EditVolume';
import { EditAccents } from './EditAccents';
import { EditSounds } from './EditSounds'

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
        initial={{ opacity: 0, filter: 'blur(2px)' }}
        animate={{ opacity: 100, filter: 'blur(0)' }}
        transition={{ duration: 0.2 }}
      >
        <EditTempo {...{ metronome, updateMetronome, tapTempo }} />
        <EditTimeSignature {...{ metronome, updateMetronome }} />
        <div className="flex flex-wrap gap-2 overflow-hidden rounded-sm sm:overflow-visible sm:rounded-none">
          <EditLength {...{ metronome, updateMetronome }} />
          <EditVolume {...{ metronome, updateMetronome }} />
          <EditAccents {...{ metronome, updateMetronome }} />
          <EditSounds {...{ metronome, updateMetronome }} />
        </div>
      </motion.div>
    );
};

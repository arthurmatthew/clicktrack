import { motion } from 'framer-motion';
import { IMetronomeUpdater } from './IMetronomeUpdater';
import { TempoIncrementButton } from './TempoIncrementButton';

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
      <div className="flex flex-grow items-center justify-between">
        <div className="flex w-full overflow-hidden rounded-sm">
          <TempoIncrementButton
            selected={metronome}
            updateMetronome={updateMetronome}
            amount={-5}
            icon="rewind-fill"
          />
          <TempoIncrementButton
            selected={metronome}
            updateMetronome={updateMetronome}
            amount={-1}
            icon="caret-left-fill"
          />
        </div>

        <div className="select-none">
          <div className="flex h-full flex-col items-center justify-center px-2">
            <h1 className="roboto w-20 bg-transparent text-center text-4xl">
              {metronome.bpm}
            </h1>
          </div>
        </div>
        <div className="flex w-full overflow-hidden rounded-sm">
          <TempoIncrementButton
            selected={metronome}
            updateMetronome={updateMetronome}
            amount={1}
            icon="caret-right-fill"
          />
          <TempoIncrementButton
            selected={metronome}
            updateMetronome={updateMetronome}
            amount={5}
            icon="fast-forward-fill"
          />
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={tapTempo}
        className="rounded-sm bg-neutral-200 hover:text-cyan-400 dark:bg-neutral-900"
      >
        <i className="bi-hand-index-thumb-fill px-3 text-xl" />
      </motion.button>
    </div>
  );
};

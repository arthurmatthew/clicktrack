import { motion } from 'framer-motion';
import { Repeat } from '../../models/Repeat';
import { NumberInput } from '../core/NumberInput';

interface IEditRepeat {
  updateRepeat: (metronome: Repeat, update: Partial<Repeat>) => void;
  repeat: Repeat | undefined;
}

export const EditRepeat = ({ updateRepeat, repeat }: IEditRepeat) => {
  if (repeat)
    return (
      <motion.div
        className="flex flex-col gap-px overflow-hidden rounded-sm text-lg sm:gap-2 sm:overflow-visible sm:rounded-none"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
      >
        <div className="flex items-center gap-3 px-2 py-1 sm:rounded-sm">
          <h1 className="text-lg">Repeat Forever: </h1>
          <button
            onClick={() =>
              updateRepeat(repeat, {
                infinite: !repeat.infinite,
              })
            }
            className="w-16 bg-neutral-200 px-1 py-2 font-semibold shadow-inner focus:outline-none dark:bg-neutral-900 sm:rounded-sm"
          >
            {repeat.infinite ? 'On' : 'Off'}
          </button>
        </div>
        <NumberInput
          disabled={repeat.infinite}
          label="Repeats"
          value={repeat.times}
          set={(value) => updateRepeat(repeat, { times: value })}
          increase={() => updateRepeat(repeat, { times: repeat.times + 1 })}
          decrease={() => updateRepeat(repeat, { times: repeat.times - 1 })}
        />
      </motion.div>
    );
};

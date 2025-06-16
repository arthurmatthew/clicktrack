import { motion } from 'framer-motion';
import { useNotify } from '../../hooks/useNotify';
import { Transition } from '../../models/Transition';

interface IEditTransition {
  updateTransition: (
    metronome: Transition,
    update: Partial<Transition>
  ) => void;
  transition: Transition | undefined;
}

export const EditTransition = ({
  updateTransition,
  transition,
}: IEditTransition) => {
  const { notify } = useNotify();

  if (transition)
    return (
      <motion.div
        className="flex flex-col gap-px overflow-hidden rounded-sm text-lg sm:gap-2 sm:overflow-visible sm:rounded-none"
        initial={{ opacity: 0, filter: 'blur(2px)' }}
        animate={{ opacity: 100, filter: 'blur(0)' }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-3 px-2 py-1 sm:rounded-sm">
          <ul>
            <li>using {transition.curveType}</li>
            <li>
              from {transition.fromMetronome?.bpm}{' '}
              {transition.fromMetronome?.timeSignature}
            </li>
            <li>
              to {transition.toMetronome?.bpm}{' '}
              {transition.toMetronome?.timeSignature}
            </li>
          </ul>
        </div>
      </motion.div>
    );
};

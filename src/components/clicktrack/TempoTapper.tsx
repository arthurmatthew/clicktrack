import { motion } from 'framer-motion';

interface ITempoTapper {
  tapTempo: () => void;
}

export const TempoTapper = ({ tapTempo }: ITempoTapper) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={tapTempo}
      className="rounded-sm bg-neutral-200 hover:text-cyan-400 dark:bg-neutral-900"
    >
      <i className="bi-hand-index-thumb-fill px-3 text-xl" />
    </motion.button>
  );
};

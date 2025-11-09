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
      className="rounded-sm bg-zinc-200 hover:bg-purple-700 hover:text-white dark:bg-zinc-900 dark:hover:bg-purple-700"
    >
      <i className="bi-hand-index-thumb-fill px-3 text-xl" />
    </motion.button>
  );
};

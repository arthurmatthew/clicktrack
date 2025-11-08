import { motion } from 'framer-motion';
import { Link } from 'react-router';

export const HeroLinks = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col flex-wrap gap-2 sm:flex-row">
        <Link to="/writeup">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.3 }}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              disabled
              className="border-gradient rounded-sm border-2 border-purple-500 bg-white px-12 py-3 text-xl disabled:cursor-not-allowed disabled:opacity-50 dark:border-purple-700 dark:bg-zinc-800 "
            >
              Mobile App
            </motion.button>
          </motion.span>
        </Link>
        <Link to="/app/clicktracks">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="border-gradient rounded-sm border-2 border-purple-700 bg-purple-700 px-12 py-3 text-xl text-white"
            >
              Use in browser <i className="bi-arrow-right pl-2" />
            </motion.button>
          </motion.span>
        </Link>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
        className="my-8 w-max rounded-full border-2 border-zinc-200 bg-white p-2 px-4 text-sm dark:border-zinc-800 dark:bg-black"
      >
        iOS and Android apps releasing soon
      </motion.p>
    </div>
  );
};

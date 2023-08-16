import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const HeroLinks = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mx-2 mt-10 flex flex-col flex-wrap items-center justify-center gap-2 sm:flex-row">
        <Link to="/app">
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
              Get started
            </motion.button>
          </motion.span>
        </Link>
        <a href="#about">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.3 }}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="border-gradient rounded-sm border-2 border-purple-500 bg-white px-12 py-3 text-xl dark:border-purple-700 dark:bg-black "
            >
              Learn more
            </motion.button>
          </motion.span>
        </a>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
        className="my-8 rounded-full border-2 border-neutral-200 bg-white p-2 px-4 text-sm dark:border-neutral-800 dark:bg-black"
      >
        Clicktrack now lives at{' '}
        <b className="font-semibold">www.useclicktrack.com</b>
      </motion.p>
    </div>
  );
};

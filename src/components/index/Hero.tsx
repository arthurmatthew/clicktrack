import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import './Hero.css';

export const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center px-2">
      <div className="mx-auto my-20 flex max-w-5xl flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          id="title"
          className="bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-700 bg-clip-text text-center text-6xl font-black text-transparent dark:from-purple-400 dark:via-violet-400 dark:to-fuchsia-700 sm:text-7xl"
        >
          The only metronome you'll ever need.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
          className="mx-2 mt-10 text-center text-lg sm:text-xl"
        >
          Seriously. <i className="inter not-italic">clicktrack</i> is a{' '}
          beautifully modern{' '}
          <i className="font-bold not-italic">dynamic metronome</i> which
          follows whatever musical arrangement you throw at it. Our user
          friendly interface allows you to build your own clicktrack and
          optimize your practice session.
        </motion.p>
        <div className="mx-2 mt-10 flex flex-col flex-wrap items-center justify-center gap-2">
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
                className="rounded-md bg-purple-700 px-12 py-3 text-xl text-white "
              >
                Get started
              </motion.button>
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
};

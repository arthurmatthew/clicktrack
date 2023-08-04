import { motion } from 'framer-motion';

export const HeroTitle = () => {
  return (
    <>
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
        <i className="font-bold not-italic">dynamic metronome</i> which follows
        whatever musical arrangement you throw at it. Our user friendly
        interface allows you to build your own clicktrack and optimize your
        practice session.
      </motion.p>
    </>
  );
};

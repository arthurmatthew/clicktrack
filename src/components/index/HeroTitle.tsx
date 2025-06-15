import { motion } from 'framer-motion';

export const HeroTitle = () => {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        id="title"
        className="text-5xl font-black text-purple-700 dark:text-purple-600 sm:text-7xl"
      >
        The musician&apos;s
        <br /> assistant.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
        className="max-w-md text-lg sm:text-xl"
      >
        We&apos;re a robust metronome for musicians and directors who need a
        smarter metronome that adapts to the score. Not the other way around.
      </motion.p>
    </>
  );
};

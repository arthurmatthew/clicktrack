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
        A musician&apos;s
        <br /> best friend.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
        className="max-w-lg text-lg sm:text-xl"
      >
        You shouldn't have to work hard to mold your metronome to your music.
        Use our robust features to flip the script, and let Clicktrack work for
        you.
      </motion.p>
    </>
  );
};

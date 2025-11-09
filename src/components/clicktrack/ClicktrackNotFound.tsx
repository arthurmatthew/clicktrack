import { motion } from 'framer-motion';

export const ClicktrackNotFound = () => {
  return (
    <div className="min-w-full flex-grow">
      <div className="mx-auto my-20 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          transition={{ delay: 5, duration: 0.7 }}
          className="flex flex-col items-center gap-4  px-10 text-xl"
        >
          <h1 className="text-center text-3xl">Stuck loading?</h1>
          <p className="text-center">
            Try going back to your clicktracks list and opening it again.
          </p>
          <p className="text-center opacity-60">
            Otherwise, the metronome you're looking for might not exist.
          </p>
        </motion.div>

        <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
          <i className="bi-arrow-clockwise animate-spin text-6xl" />
        </div>
      </div>
    </div>
  );
};

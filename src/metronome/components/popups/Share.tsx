import { motion } from 'framer-motion';
import Clicktrack from '../../classes/clicktrack';
import { useRef } from 'react';

const Share = ({
  clicktrack,
  hideShare,
}: {
  clicktrack: Clicktrack;
  hideShare: () => void;
}) => {
  const copyToClipboardRef = useRef<HTMLParagraphElement | null>(null);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyToClipboardRef.current?.innerText || '');
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center text-black dark:text-white">
      <motion.div
        className="relative z-50 mx-4 max-w-5xl rounded-2xl border-[1px] border-neutral-300 bg-white/5 p-8 shadow-2xl backdrop-blur-md dark:border-neutral-800 dark:bg-black/50"
        onClick={hideShare}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }}
      >
        <h1 className="mb-3 text-left text-3xl font-semibold">Share</h1>
        <p className="text-lg">
          Below is a copyable code which you can share with other users. They
          can use the code in the import section of the metronome list.
        </p>
        <p
          ref={copyToClipboardRef}
          className="w mt-3 max-h-40 overflow-y-scroll break-all rounded-2xl rounded-b-none bg-neutral-200 p-4 dark:bg-neutral-900"
        >
          {btoa(JSON.stringify(clicktrack))}
        </p>
        <button
          onClick={copyToClipboard}
          className="w-full rounded-b-2xl bg-black py-4 text-lg text-white dark:bg-white dark:text-black"
        >
          Click to Copy
        </button>
      </motion.div>
    </div>
  );
};

export default Share;

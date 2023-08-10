import { motion } from 'framer-motion';

interface ICustomTimeSignatureRow {
  increase: () => void;
  decrease: () => void;
  number: number;
}

export const CustomTimeSignatureRow = ({
  increase,
  decrease,
  number,
}: ICustomTimeSignatureRow) => {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={increase}
        className="flex aspect-square h-7 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-900"
      >
        <i className="bi-plus leading-[0]" />
      </motion.button>
      <h1 className="w-7 text-center leading-[0] sm:w-14">{number}</h1>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={decrease}
        className="flex aspect-square h-7 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-900"
      >
        <i className="bi-dash leading-[0]" />
      </motion.button>
    </div>
  );
};

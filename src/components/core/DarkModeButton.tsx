import { motion } from 'framer-motion';
import { IButton } from './Button';

interface IDarkModeButton extends IButton {
  dark: boolean;
}

export const DarkModeButton = ({
  dark,
  onClick,
  className,
}: IDarkModeButton) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <i
        className={`${dark ? 'bi-moon' : 'bi-sun'} ${className}`}
        onClick={onClick}
      />
    </motion.div>
  );
};

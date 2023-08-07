import { motion } from 'framer-motion';
import { IComponent } from '../IComponent';

interface IButton extends IComponent {
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}

export const Button = ({ children, className, onClick, disabled }: IButton) => {
  return (
    <motion.button
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={'rounded-sm px-10 py-2 ' + className}
    >
      {children}
    </motion.button>
  );
};

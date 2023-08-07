import { useAnimationControls } from 'framer-motion';

export const useVisualizer = () => {
  const controls = useAnimationControls();
  const pulse = () => {
    controls.start({
      filter: ['hue-rotate(45deg)', 'hue-rotate(0)'],
      transition: { duration: 1, ease: 'easeOut' },
    });
  };

  return { controls, pulse };
};

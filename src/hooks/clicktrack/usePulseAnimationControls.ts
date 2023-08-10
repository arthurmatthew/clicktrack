import { useAnimationControls } from 'framer-motion';

export const usePulseAnimationControls = () => {
  const pulseAnimationControls = useAnimationControls();
  const startPulseAnimation = () => {
    pulseAnimationControls.start({
      filter: ['hue-rotate(45deg)', 'hue-rotate(0)'],
      transition: { duration: 1, ease: 'easeOut' },
    });
  };

  return { pulseAnimationControls, startPulseAnimation };
};

import { useState, useCallback } from 'react';

type UseDragGridOptions = {
  onCellActivate: (index: number) => void;
};

export function useDragGrid({ onCellActivate }: UseDragGridOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const startDrag = useCallback(
    (index: number) => {
      setIsDragging(true);
      setActiveIndex(index);
      onCellActivate(index);
    },
    [onCellActivate],
  );

  const moveDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging) return;

      const el = document.elementFromPoint(clientX, clientY);
      if (!el) return;

      const cell = el.closest('[data-accent-index]');
      if (!cell) return;

      const newIndex = Number(cell.getAttribute('data-accent-index'));
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        onCellActivate(newIndex);
      }
    },
    [isDragging, activeIndex, onCellActivate],
  );

  const endDrag = useCallback(() => {
    setIsDragging(false);
    setActiveIndex(null);
  }, []);

  return {
    isDragging,
    activeIndex,
    startDrag,
    moveDrag,
    endDrag,
  };
}

import { useRef, useEffect } from 'react';
import { IComponent } from '../IComponent';

interface IVolumeSlider extends IComponent {
  muted: boolean;
  volume: number;
  updateVolume: (volume: number) => void;
}

export const VolumeSlider = ({
  muted,
  volume,
  updateVolume,
}: IVolumeSlider) => {
  const updating = useRef<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!updating.current || !sliderRef.current || muted) return;

      const boundingClientRect = sliderRef.current.getBoundingClientRect();
      const range = boundingClientRect.right - boundingClientRect.left;
      const clientXRelativeToRange = boundingClientRect.right - e.clientX - 0.5;

      const clientXPercentage = 150 - (clientXRelativeToRange / range) * 150;

      // Clamp between 0 and 150
      const clampedValue = Math.max(
        0,
        Math.min(150, Math.ceil(clientXPercentage)),
      );
      updateVolume(clampedValue);
    };

    const handleMouseUp = () => {
      updating.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [muted, updateVolume]);

  return (
    <div
      ref={sliderRef}
      onMouseDown={(e) => {
        if (muted) return;
        updating.current = true;

        // Initial position set
        const boundingClientRect = e.currentTarget.getBoundingClientRect();
        const range = boundingClientRect.right - boundingClientRect.left;
        const clientXRelativeToRange =
          boundingClientRect.right - e.clientX - 0.5;
        const clientXPercentage = 150 - (clientXRelativeToRange / range) * 150;
        updateVolume(Math.max(0, Math.min(150, Math.ceil(clientXPercentage))));
      }}
      className={`relative h-full w-40 overflow-hidden rounded-sm rounded-l-none bg-zinc-200 dark:bg-zinc-800 ${
        muted ? 'opacity-50' : ''
      }`}
    >
      <span className="roboto pointer-events-none absolute flex h-full items-center justify-center px-4 select-none">
        {muted ? <span className="inter">Muted</span> : `${volume}%`}
      </span>
      <div
        style={{
          width: `${(volume / 150) * 100}%`,
          transition: 'background-color 75ms',
        }}
        className={`h-full bg-zinc-300 dark:bg-zinc-900 ${
          muted ? '' : 'hover:bg-zinc-100 dark:hover:bg-zinc-700'
        }`}
      ></div>
    </div>
  );
};

import { useRef } from 'react';
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

  const dragSlider = (e: React.MouseEvent) => {
    if (muted) return;
    if (updating.current === false) return;

    const boundingClientRect = e.currentTarget.getBoundingClientRect();
    const range = boundingClientRect.right - boundingClientRect.left;
    const clientXRelativeToRange = boundingClientRect.right - e.clientX - 0.5;
    // for some reason its off by 0.5

    const clientXPercentage = 150 - (clientXRelativeToRange / range) * 150;
    // 150 - reverses it so that leftmost is 0%

    updateVolume(Math.ceil(clientXPercentage));
  };

  return (
    <div
      onMouseDown={(e) => {
        if (muted) return;
        updating.current = true;
        dragSlider(e);
      }}
      onMouseUp={() => {
        updating.current = false;
      }}
      onMouseMove={dragSlider}
      className={`relative h-full w-40 overflow-hidden rounded-sm rounded-l-none bg-neutral-800 ${
        muted ? 'opacity-50' : ''
      }`}
    >
      <span className="roboto pointer-events-none absolute flex h-full select-none items-center justify-center px-4">
        {muted ? <span className="inter">Muted</span> : `${volume}%`}
      </span>
      <div
        style={{
          width: `${(volume / 150) * 100}%`,
          transition: 'background-color 75ms',
        }}
        className={`h-full bg-neutral-900 ${
          muted ? '' : 'hover:bg-neutral-700'
        }`}
      ></div>
    </div>
  );
};

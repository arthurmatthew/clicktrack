import { IComponent } from '../IComponent';

interface IRangeInput extends IComponent {
  muted: boolean;
  volume: number;
  updateVolume: (volume: number) => void;
}

export const RangeInput = ({
  muted,
  volume,
  updateVolume,
  className,
}: IRangeInput) => {
  return (
    <div
      className={`flex gap-3 rounded-sm bg-neutral-200 p-2 px-4 dark:bg-neutral-900 ${
        muted && 'opacity-50'
      } ${className}`}
    >
      <p className="roboto w-12 text-center">
        {volume}
        <span className="inter">%</span>
      </p>
      <input
        className="w-full accent-purple-500"
        disabled={muted}
        type="range"
        value={volume}
        onChange={(e) => updateVolume(parseInt(e.currentTarget.value))}
        min={0}
        max={150}
      />
    </div>
  );
};

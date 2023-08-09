import { IMetronomeUpdater } from './IMetronomeUpdater';

export const EditVolume = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-sm opacity-50">Volume</h2>
      <div className="flex flex-col gap-1">
        <div className="flex gap-4">
          <button
            className="rounded-sm bg-neutral-200 px-10 py-2 dark:bg-neutral-900"
            onClick={() => {
              updateMetronome(metronome, { muted: !metronome.muted });
            }}
          >
            {metronome.muted || metronome.volume === 0 ? (
              <i className="bi-volume-mute-fill" />
            ) : (
              <i
                className={`bi-volume-${
                  metronome.volume > 80 ? 'up' : 'down'
                }-fill`}
              />
            )}
          </button>
        </div>

        <div
          className={`flex gap-3 rounded-sm bg-neutral-200 p-2 px-4 dark:bg-neutral-900 ${
            metronome.muted && 'opacity-50'
          }`}
        >
          <p className="roboto w-12 text-center">
            {metronome.volume}
            <span className="inter">%</span>
          </p>
          <input
            className="w-full accent-purple-500"
            disabled={metronome.muted}
            type="range"
            value={metronome.volume}
            onChange={(e) =>
              updateMetronome(metronome, {
                volume: parseInt(e.currentTarget.value),
              })
            }
            min={0}
            max={150}
          />
        </div>
      </div>
    </div>
  );
};

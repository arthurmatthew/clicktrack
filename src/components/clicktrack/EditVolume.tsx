import { IMetronomeUpdater } from './IMetronomeUpdater';
import { VolumeSlider } from './VolumeSlider';

export const EditVolume = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-sm opacity-50">Volume</h2>
      <div className="flex gap-1">
        <div className="flex gap-4">
          <button
            className="rounded-sm rounded-r-none bg-zinc-200 p-2 px-4 dark:bg-zinc-900"
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
        <VolumeSlider
          muted={metronome.muted}
          volume={metronome.volume}
          updateVolume={(volume: number) =>
            updateMetronome(metronome, { volume: volume })
          }
        />
      </div>
    </div>
  );
};

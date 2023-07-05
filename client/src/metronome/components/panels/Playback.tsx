import Metronome from '../../metronome';
import Panel from './Panel';

const Playback = ({
  metronome,
  incrementBpm,
  setVolume,
  play,
}: {
  metronome: Metronome;
  incrementBpm: (amount: number) => void;
  setVolume: (percent: number) => void;
  play: () => void;
}) => {
  return (
    <Panel title="Playback" className="lg:col-span-2">
      <div className="flex h-full flex-col items-center justify-center gap-5 py-3 md:flex-row md:justify-evenly">
        <div className="flex gap-3">
          <button onClick={() => incrementBpm(-5)}>
            <i className="bi-rewind-fill text-3xl text-purple-700" />
          </button>
          <button onClick={() => incrementBpm(-1)}>
            <i className="bi-caret-left-fill text-4xl text-purple-700" />
          </button>
          <button
            onClick={play}
            className="rounded-2xl bg-purple-700 p-4 px-5 text-3xl"
          >
            <i className="bi-play-fill text-purple-100" />
          </button>
          <button onClick={() => incrementBpm(1)}>
            <i className="bi-caret-right-fill text-4xl text-purple-700" />
          </button>
          <button onClick={() => incrementBpm(5)}>
            <i className="bi-fast-forward-fill text-3xl text-purple-700" />
          </button>
        </div>
        <div className="h-px w-full bg-slate-300 md:h-full md:w-px" />
        <div className="flex gap-2">
          <i className="bi-volume-up-fill" />
          <p>{metronome.data.volume}%</p>
          <input
            type="range"
            onChange={(e) => setVolume(parseInt(e.target.value))}
            min={0}
            max={150}
          />
        </div>
      </div>
    </Panel>
  );
};

export default Playback;

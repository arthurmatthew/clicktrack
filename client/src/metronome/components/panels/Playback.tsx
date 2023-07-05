import Panel from './Panel';

const Playback = ({
  incrementBpm,
  play,
}: {
  incrementBpm: (amount: number) => void;
  play: () => void;
}) => {
  return (
    <Panel title="Playback" className="lg:col-span-2">
      <div className="flex h-full items-center justify-center gap-5">
        <button onClick={() => incrementBpm(-5)}>
          <i className="bi-rewind-fill text-5xl text-purple-700" />
        </button>
        <button onClick={() => incrementBpm(-1)}>
          <i className="bi-caret-left-fill text-6xl text-purple-700" />
        </button>
        <button
          onClick={play}
          className="rounded-full bg-purple-700 p-6 text-5xl"
        >
          <i className="bi-play-fill text-purple-100" />
        </button>
        <button onClick={() => incrementBpm(1)}>
          <i className="bi-caret-right-fill text-6xl text-purple-700" />
        </button>
        <button onClick={() => incrementBpm(5)}>
          <i className="bi-fast-forward-fill text-5xl text-purple-700" />
        </button>
      </div>
    </Panel>
  );
};

export default Playback;

import getTempoName from '../../../helpers/getTempoName';
import Clicktrack from '../../classes/clicktrack';

type Metronome = Clicktrack['data']['children'][number];

const Selected = ({
  updateMetronome,
  deleteMetronome,
  selected,
}: {
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void;
  deleteMetronome: (id: string) => void;
  selected: Metronome | undefined;
}) => {
  const timeSignatures: [beats: number, value: number][] = [
    [4, 4],
    [3, 4],
    [5, 4],
    [2, 4],
    [2, 2],
    [12, 8],
  ];

  if (selected)
    return (
      <div className="flex flex-col gap-4">
        <div className="hidden grid-cols-2 sm:grid">
          <h1>Tempo</h1>
          <h1>Time Signature</h1>
        </div>
        <div className="grid items-center gap-4 sm:grid-cols-2">
          <div>
            <div className="flex items-center justify-between gap-1 text-slate-700">
              <div className="flex w-full overflow-hidden rounded-md">
                <TempoIncrementButton
                  selected={selected}
                  updateMetronome={updateMetronome}
                  amount={-5}
                  icon="rewind-fill border-r-2  border-slate-300"
                />
                <TempoIncrementButton
                  selected={selected}
                  updateMetronome={updateMetronome}
                  amount={-1}
                  icon="caret-left-fill"
                />
              </div>

              <div className="aspect-square w-fit select-none">
                <div className="flex h-full flex-col items-center justify-center px-2">
                  <h2>BPM:</h2>
                  <h1 className="roboto bg-transparent text-center text-4xl font-bold focus:underline focus:outline-none">
                    {selected.bpm}
                  </h1>
                  <h2 className="lora text-center italic">
                    {getTempoName(selected.bpm)}
                  </h2>
                </div>
              </div>
              <div className="flex w-full overflow-hidden rounded-md">
                <TempoIncrementButton
                  selected={selected}
                  updateMetronome={updateMetronome}
                  amount={1}
                  icon="caret-right-fill"
                />
                <TempoIncrementButton
                  selected={selected}
                  updateMetronome={updateMetronome}
                  amount={5}
                  icon="fast-forward-fill border-l-2 border-slate-300"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="lora grid grid-cols-3 gap-1 text-2xl font-semibold text-slate-700">
              {timeSignatures.map((timeSignature) => (
                <TimeSignatureButton
                  key={JSON.stringify(timeSignature)}
                  onClick={() =>
                    updateMetronome(selected, { timeSignature: timeSignature })
                  }
                  selected={
                    JSON.stringify(selected.timeSignature) ==
                    JSON.stringify(timeSignature)
                  }
                  time={timeSignature}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => deleteMetronome(selected.id)}
            className="w-full rounded-sm bg-slate-700 p-2 px-4 text-slate-200 duration-75 hover:bg-red-500"
          >
            Delete this Section
          </button>
          <p className="text-center text-xs opacity-50">{selected.id}</p>
        </div>
      </div>
    );
};

const TempoIncrementButton = ({
  updateMetronome,
  selected,
  amount,
  icon,
}: {
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void;
  selected: Metronome;
  amount: number;
  icon: string;
}) => {
  return (
    <i
      onClick={() => {
        if (selected.bpm + amount < 20) {
          updateMetronome(selected, { bpm: 20 });
          return;
        }
        if (selected.bpm + amount > 500) {
          updateMetronome(selected, { bpm: 500 });
          return;
        }
        updateMetronome(selected, {
          bpm: selected.bpm + amount,
        });
      }}
      className={`bi-${icon} flex flex-grow cursor-pointer items-center justify-center bg-slate-700 py-2 text-2xl tracking-tighter text-slate-200`}
    />
  );
};

const TimeSignatureButton = ({
  time,
  selected,
  onClick,
}: {
  time: [beats: number, value: number];
  selected?: boolean;
  onClick: () => any;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center"
    >
      <div
        className={`flex h-full w-full flex-col items-center justify-center rounded-md border-2 p-2 leading-none duration-75 hover:border-slate-700 ${
          selected
            ? 'border-slate-700 bg-slate-700 text-slate-100'
            : 'border-slate-300'
        }`}
      >
        <h1>{time[0]}</h1>
        <h1>{time[1]}</h1>
      </div>
    </button>
  );
};

export default Selected;

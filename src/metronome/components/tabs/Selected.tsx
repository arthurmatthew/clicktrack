import getTempoName from '../../../helpers/getTempoName';
import Clicktrack from '../../classes/clicktrack';

const Selected = ({
  updateBpm,
  updateTime,
  deleteMetronome,
  selected,
}: {
  updateBpm: (
    metronome: Clicktrack['data']['children'][number],
    amount: number,
    set?: number
  ) => void;
  updateTime: (
    metronome: Clicktrack['data']['children'][number],
    time: [beats: number, value: number]
  ) => void;
  deleteMetronome: (id: string) => void;
  selected: Clicktrack['data']['children'][number] | undefined;
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
        <div className="grid grid-cols-2">
          <h1>Tempo</h1>
          <h1>Time Signature</h1>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div>
            <div className="flex items-center justify-center gap-3 text-slate-700">
              <i
                onClick={() => updateBpm(selected, -5)}
                className="bi-caret-left-fill cursor-pointer text-3xl tracking-tighter"
              />
              <div className="aspect-square w-fit select-none rounded-full border-4 border-slate-700">
                <div className="mx-6 flex h-full flex-col items-center justify-center">
                  <h1 className="roboto w-16 bg-transparent text-center text-4xl font-bold focus:underline focus:outline-none">
                    {selected.bpm}
                  </h1>
                  <h2 className="lora w-24 text-center italic">
                    {getTempoName(selected.bpm)}
                  </h2>
                </div>
              </div>
              <i
                onClick={() => updateBpm(selected, 5)}
                className="bi-caret-right-fill cursor-pointer text-3xl tracking-tighter"
              />
            </div>
          </div>
          <div>
            <div className="lora grid grid-cols-3 gap-1 text-2xl font-semibold text-slate-700">
              {timeSignatures.map((time) => (
                <TimeSignatureButton
                  key={JSON.stringify(time)}
                  onClick={() => updateTime(selected, time)}
                  selected={
                    JSON.stringify(selected.timeSignature) ==
                    JSON.stringify(time)
                  }
                  time={time}
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

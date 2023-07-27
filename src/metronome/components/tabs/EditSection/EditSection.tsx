import Clicktrack from '../../../classes/clicktrack';
import TempoIncrementButton from './TempoIncrementButton';
import TimeSignatureButton from './TimeSignatureButton';

type Metronome = Clicktrack['data']['children'][number];

const EditSection = ({
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
      <div className="flex flex-col gap-4 p-4  ">
        <div className="grid items-center gap-4">
          <div>
            <div className="flex items-center justify-between gap-1">
              <div className="flex w-full overflow-hidden rounded-md">
                <TempoIncrementButton
                  selected={selected}
                  updateMetronome={updateMetronome}
                  amount={-5}
                  icon="rewind-fill"
                />
                <TempoIncrementButton
                  selected={selected}
                  updateMetronome={updateMetronome}
                  amount={-1}
                  icon="caret-left-fill"
                />
              </div>

              <div className="select-none">
                <div className="flex h-full flex-col items-center justify-center px-2">
                  <h1 className="roboto w-20 bg-transparent text-center text-4xl font-bold">
                    {selected.bpm}
                  </h1>
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
                  icon="fast-forward-fill"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="lora grid grid-cols-3 gap-[2px] overflow-hidden rounded-md border-2 border-neutral-200 bg-neutral-200 text-2xl font-semibold dark:border-neutral-900 dark:bg-neutral-900">
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
          <div className="flex gap-5">
            <div className="flex items-center gap-3 rounded-md bg-neutral-200 px-2 py-1 dark:bg-neutral-900">
              <h1 className="text-lg">Length:</h1>
              <input
                type="number"
                value={selected.lengthInBars}
                onChange={(e) =>
                  updateMetronome(selected, {
                    lengthInBars:
                      parseInt(e.currentTarget.value) || selected.lengthInBars,
                  })
                }
                className="w-16 rounded-md bg-white px-1 py-2 font-semibold shadow-inner focus:outline-none dark:bg-black"
              />
              <h1 className="text-lg">bars</h1>
            </div>
            <div className="flex items-center gap-3 rounded-md bg-neutral-200 px-2 py-1 dark:bg-neutral-900">
              <h1 className="text-lg">Custom Time Signature:</h1>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={selected.timeSignature[0]}
                  onChange={(e) =>
                    updateMetronome(selected, {
                      timeSignature:
                        [
                          parseInt(e.currentTarget.value),
                          selected.timeSignature[1],
                        ] || selected.timeSignature[0],
                    })
                  }
                  className="w-10 rounded-md bg-white px-1 py-2 font-semibold shadow-inner focus:outline-none dark:bg-black"
                />
                <h1 className="text-lg">/</h1>
                <input
                  type="number"
                  value={selected.timeSignature[1]}
                  onChange={(e) =>
                    updateMetronome(selected, {
                      timeSignature:
                        [
                          selected.timeSignature[0],
                          parseInt(e.currentTarget.value),
                        ] || selected.timeSignature[1],
                    })
                  }
                  className="w-10 rounded-md bg-white px-1 py-2 font-semibold shadow-inner focus:outline-none dark:bg-black"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => deleteMetronome(selected.id)}
            className="w-full rounded-sm bg-neutral-200 p-2 px-4 duration-75 hover:bg-red-400 dark:bg-neutral-900 dark:hover:bg-red-900"
          >
            Delete this Section
          </button>
          <p className="text-center text-xs opacity-50">{selected.id}</p>
        </div>
      </div>
    );
};

export default EditSection;

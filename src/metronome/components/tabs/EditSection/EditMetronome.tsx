import { Metronome } from '../../../classes/section';
import { TempoIncrementButton } from './TempoIncrementButton';
import { TimeSignatureButton } from './TimeSignatureButton';

export const EditMetronome = ({
  updateMetronome,
  deleteMetronome,
  copyMetronome,
  metronome,
}: {
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void;
  deleteMetronome: (id: string) => void;
  copyMetronome: (id: string) => void;
  metronome: Metronome | undefined;
}) => {
  const timeSignatures: [beats: number, value: number][] = [
    [4, 4],
    [3, 4],
    [5, 4],
    [2, 4],
    [2, 2],
    [12, 8],
  ];

  const tempoTapTimes: number[] = [];
  let tempoTapTimer: number;
  const tapTempo = () => {
    if (!metronome) return;

    tempoTapTimes.push(Date.now());

    const tapDifferences =
      tempoTapTimes.length > 1 &&
      (tempoTapTimes
        .map((timeAtTap, index) => {
          if (tempoTapTimes[index + 1])
            return tempoTapTimes[index + 1] - timeAtTap;
        })
        .filter((timeAtTap) => timeAtTap) as number[]);

    if (tapDifferences) {
      const averageTapDifference =
        tapDifferences.slice(-4).reduce((a, b) => a + b) /
        tapDifferences.slice(-4).length;
      const averageBpm = Math.ceil(60 / (averageTapDifference / 1000));

      if (averageBpm > 500) updateMetronome(metronome, { bpm: 500 });
      else if (averageBpm < 20) updateMetronome(metronome, { bpm: 20 });
      else updateMetronome(metronome, { bpm: averageBpm });
    }

    if (tempoTapTimer) clearTimeout(tempoTapTimer);
    tempoTapTimer = setTimeout(() => {
      tempoTapTimes.length = 0;
    }, 2000);
  };

  if (metronome)
    return (
      <div className="flex flex-col gap-2 p-4">
        <div className="grid items-center gap-2">
          <div className="flex gap-2">
            <div className="flex flex-grow items-center justify-between">
              <div className="flex w-full overflow-hidden rounded-sm">
                <TempoIncrementButton
                  selected={metronome}
                  updateMetronome={updateMetronome}
                  amount={-5}
                  icon="rewind-fill"
                />
                <TempoIncrementButton
                  selected={metronome}
                  updateMetronome={updateMetronome}
                  amount={-1}
                  icon="caret-left-fill"
                />
              </div>

              <div className="select-none">
                <div className="flex h-full flex-col items-center justify-center px-2">
                  <h1 className="roboto w-20 bg-transparent text-center text-4xl">
                    {metronome.bpm}
                  </h1>
                </div>
              </div>
              <div className="flex w-full overflow-hidden rounded-sm">
                <TempoIncrementButton
                  selected={metronome}
                  updateMetronome={updateMetronome}
                  amount={1}
                  icon="caret-right-fill"
                />
                <TempoIncrementButton
                  selected={metronome}
                  updateMetronome={updateMetronome}
                  amount={5}
                  icon="fast-forward-fill"
                />
              </div>
            </div>
            <button
              onClick={tapTempo}
              className="rounded-sm bg-neutral-200 dark:bg-neutral-900"
            >
              <i className="bi-hand-index-thumb-fill px-3 text-xl" />
            </button>
          </div>
          <div>
            <div className="lora grid grid-cols-3 gap-px overflow-hidden rounded-sm border-[1px] border-neutral-200 bg-neutral-200 text-2xl font-semibold dark:border-neutral-900 dark:bg-neutral-900">
              {timeSignatures.map((timeSignature) => (
                <TimeSignatureButton
                  key={JSON.stringify(timeSignature)}
                  onClick={() =>
                    updateMetronome(metronome, { timeSignature: timeSignature })
                  }
                  selected={
                    JSON.stringify(metronome.timeSignature) ==
                    JSON.stringify(timeSignature)
                  }
                  time={timeSignature}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-px overflow-hidden rounded-sm sm:flex-row sm:gap-2 sm:overflow-visible sm:rounded-none">
            <div className="flex items-center gap-3 bg-neutral-200 px-2 py-1 dark:bg-neutral-900 sm:rounded-sm">
              <h1 className="text-lg">Length:</h1>
              <input
                type="number"
                value={metronome.lengthInBars}
                onChange={(e) =>
                  updateMetronome(metronome, {
                    lengthInBars:
                      parseInt(e.currentTarget.value) || metronome.lengthInBars,
                  })
                }
                className="w-16 bg-white px-1 py-2 font-semibold shadow-inner focus:outline-none dark:bg-black sm:rounded-sm"
              />
              <h1 className="text-lg">bars</h1>
            </div>
            <div className="flex items-center gap-3 rounded-sm bg-neutral-200 px-2 py-1 dark:bg-neutral-900">
              <h1 className="text-lg">Custom Time Signature:</h1>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={metronome.timeSignature[0]}
                  onChange={(e) =>
                    updateMetronome(metronome, {
                      timeSignature:
                        [
                          parseInt(e.currentTarget.value),
                          metronome.timeSignature[1],
                        ] || metronome.timeSignature[0],
                    })
                  }
                  className="w-10 rounded-sm bg-white px-1 py-2 font-semibold shadow-inner focus:outline-none dark:bg-black"
                />
                <h1 className="text-lg">/</h1>
                <input
                  type="number"
                  value={metronome.timeSignature[1]}
                  onChange={(e) =>
                    updateMetronome(metronome, {
                      timeSignature:
                        [
                          metronome.timeSignature[0],
                          parseInt(e.currentTarget.value),
                        ] || metronome.timeSignature[1],
                    })
                  }
                  className="w-10 rounded-sm bg-white px-1 py-2 font-semibold shadow-inner focus:outline-none dark:bg-black"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-px overflow-hidden rounded-sm">
          <button
            onClick={() => copyMetronome(metronome.id)}
            className="w-full bg-neutral-200 p-2 px-4 duration-75 dark:bg-neutral-900"
          >
            Duplicate
          </button>
          <button
            onClick={() => deleteMetronome(metronome.id)}
            className="w-full bg-neutral-200 p-2 px-4 duration-75 hover:bg-red-400 dark:bg-neutral-900 dark:hover:bg-red-900"
          >
            Delete this Section
          </button>
        </div>
      </div>
    );
};

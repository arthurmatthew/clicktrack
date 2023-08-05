import { IMetronomeUpdater } from './IMetronomeUpdater';

export const EditCustomTimeSignature = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  return (
    <div className="flex items-center gap-3 rounded-sm bg-neutral-200 px-2 py-1 dark:bg-neutral-900">
      <h1 className="text-lg">Custom Time Signature:</h1>
      <div className="flex items-center gap-1">
        <input
          type="number"
          value={metronome.timeSignature[0]}
          onChange={(e) =>
            updateMetronome(metronome, {
              timeSignature:
                [parseInt(e.currentTarget.value), metronome.timeSignature[1]] ??
                metronome.timeSignature[0],
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
                [metronome.timeSignature[0], parseInt(e.currentTarget.value)] ??
                metronome.timeSignature[1],
            })
          }
          className="w-10 rounded-sm bg-white px-1 py-2 font-semibold shadow-inner focus:outline-none dark:bg-black"
        />
      </div>
    </div>
  );
};

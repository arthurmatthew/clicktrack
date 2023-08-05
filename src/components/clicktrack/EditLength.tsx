import { IMetronomeUpdater } from './IMetronomeUpdater';

export const EditLength = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  return (
    <div className="flex items-center gap-3 bg-neutral-200 px-2 py-1 dark:bg-neutral-900 sm:rounded-sm">
      <h1 className="text-lg">Length:</h1>
      <input
        type="number"
        value={metronome.lengthInBars}
        onChange={(e) =>
          updateMetronome(metronome, {
            lengthInBars:
              parseInt(e.currentTarget.value) ?? metronome.lengthInBars,
          })
        }
        className="w-16 bg-white px-1 py-2 font-semibold shadow-inner focus:outline-none dark:bg-black sm:rounded-sm"
      />
      <h1 className="text-lg">bars</h1>
    </div>
  );
};

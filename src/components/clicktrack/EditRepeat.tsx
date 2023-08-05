import { Repeat } from '../../models/clicktrack/Repeat';

interface IEditRepeat {
  updateRepeat: (metronome: Repeat, update: Partial<Repeat>) => void;
  repeat: Repeat | undefined;
}

export const EditRepeat = ({ updateRepeat, repeat }: IEditRepeat) => {
  if (repeat)
    return (
      <div className="flex flex-col gap-px overflow-hidden rounded-sm text-lg sm:gap-2 sm:overflow-visible sm:rounded-none">
        <div className="flex items-center gap-3 px-2 py-1 sm:rounded-sm">
          <h1 className="text-lg">Repeat Forever: </h1>
          <button
            onClick={() =>
              updateRepeat(repeat, {
                infinite: !repeat.infinite,
              })
            }
            className="w-16 bg-neutral-200 px-1 py-2 font-semibold shadow-inner focus:outline-none dark:bg-neutral-900 sm:rounded-sm"
          >
            {repeat.infinite ? 'On' : 'Off'}
          </button>
        </div>
        <div
          className={`flex items-center gap-3 bg-neutral-200 px-2 py-1 dark:bg-neutral-900 sm:rounded-sm ${
            repeat.infinite && 'opacity-50'
          }`}
        >
          <h1 className="text-lg">Repeat</h1>
          <input
            disabled={repeat.infinite}
            type="number"
            value={repeat.times}
            onChange={(e) =>
              updateRepeat(repeat, {
                times: parseInt(e.currentTarget.value) ?? repeat.times,
              })
            }
            min={'1'}
            className="w-16 bg-white px-1 py-2 font-semibold shadow-inner focus:outline-none dark:bg-black sm:rounded-sm"
          />
          <h1>times</h1>
        </div>
      </div>
    );
};

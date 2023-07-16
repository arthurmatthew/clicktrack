import Clicktrack from '../../classes/clicktrack';
import { Metronome } from '../../classes/metronome';

const Sequencer = ({
  add,
  selectedId,
  setSelectedId,
  sequence,
}: {
  add: (child: Clicktrack['data']['children'][number]) => void;
  selectedId: string;
  setSelectedId: (id: string) => void;
  sequence: Clicktrack['data']['children'];
}) => {
  return (
    <div className="flex select-none flex-col gap-2">
      <div className="rounded-2 flex flex-col gap-2 py-2 text-xl">
        <h1>Start</h1>
        {sequence.map((x) => {
          const selected = x.id == selectedId;
          return (
            <div
              key={x.id}
              className="group flex cursor-pointer items-center gap-2 text-slate-950 dark:text-slate-200"
              onClick={() => setSelectedId(x.id)}
            >
              <div
                className={`rounded-lg ${
                  selected
                    ? 'bg-purple-400 text-slate-950'
                    : 'bg-slate-300 duration-75 hover:bg-purple-400 hover:text-slate-950 dark:bg-slate-700'
                } w-full p-4 py-3`}
              >
                {x.bpm} BPM for {x.lengthInBars} bars
              </div>
            </div>
          );
        })}
        <div
          onClick={() => add(new Metronome())}
          className="col-span-2 flex cursor-pointer items-center gap-2 text-slate-950 dark:text-slate-200"
        >
          <div className="w-full rounded-lg border-2 border-dashed border-slate-300 p-4 py-3 dark:border-slate-700">
            Add a Section
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sequencer;

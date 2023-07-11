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
      <ul className="rounded-2 flex flex-wrap items-center gap-2 border-l-2 border-purple-400 p-2 text-xl">
        {sequence.map((x, i) => {
          const selected = x.id == selectedId;
          return (
            <li
              key={x.id}
              className="group mx-2 flex cursor-pointer items-center gap-2 text-slate-950 dark:text-slate-200"
              onClick={() => setSelectedId(x.id)}
            >
              <span className="group-hover:hidden">
                <p
                  className={`roboto h-fit leading-none ${
                    selected
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'group-hover:text-purple-400'
                  } `}
                >
                  {i + 1}
                </p>
              </span>
              <span className="hidden group-hover:block ">
                <p>{'>'}</p>
              </span>
              <div
                className={`rounded-lg ${
                  selected
                    ? 'bg-purple-400 text-slate-950'
                    : 'bg-slate-300 group-hover:bg-purple-400 group-hover:text-slate-950 dark:bg-slate-700'
                } px-2`}
              >
                {x.bpm} BPM for {x.lengthInBars} bars
              </div>
            </li>
          );
        })}
      </ul>
      <ul className="flex gap-3">
        <li
          onClick={() => add(new Metronome())}
          className="cursor-pointer rounded-md border-2 border-dashed border-purple-400 p-2 px-4 text-lg"
        >
          <i className="bi-plus text-xl" />
          Section
        </li>
      </ul>
    </div>
  );
};

export default Sequencer;

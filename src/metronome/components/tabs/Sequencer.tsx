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
      <ul className="flex flex-wrap items-center gap-2 rounded-sm bg-slate-800 p-2 text-xl">
        {sequence.map((x, i) => {
          const selected = x.id == selectedId;
          return (
            <li
              key={x.id}
              className="mx-2 flex items-center gap-2 text-slate-200"
              onClick={() => setSelectedId(x.id)}
            >
              <div
                className={`roboto h-fit leading-none ${
                  selected ? 'text-purple-400' : ''
                } `}
              >
                {i + 1}
              </div>
              <div
                className={`rounded-lg ${
                  selected
                    ? 'bg-gradient-to-tr from-purple-400 to-purple-300 text-slate-950'
                    : 'bg-slate-700'
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
          className="rounded-md border-2 border-dashed border-purple-400 p-2 px-4 text-lg"
        >
          <i className="bi-plus text-xl" />
          Section
        </li>
      </ul>
    </div>
  );
};

export default Sequencer;

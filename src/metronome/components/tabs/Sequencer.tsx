import getTempoName from '../../../helpers/getTempoName';
import Clicktrack from '../../classes/clicktrack';
import { Metronome } from '../../classes/section';

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
    <div className="flex select-none flex-col gap-2  ">
      <div className="rounded-2 flex flex-col text-xl">
        {sequence.map((metronome) => {
          const selected = metronome.id === selectedId;
          return (
            <div
              key={metronome.id}
              className="group flex cursor-pointer items-center gap-2"
              onClick={() => setSelectedId(metronome.id)}
            >
              <div
                className={`relative w-full p-4 py-3 duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                  selected && 'py-6'
                }`}
              >
                {' '}
                <p className="relative z-10">
                  {getTempoName(metronome.bpm)} for {metronome.lengthInBars}{' '}
                  bars
                </p>
                <div
                  className={`absolute left-0 top-0 h-full w-full bg-neutral-100 duration-75 dark:bg-neutral-800 ${
                    !selected && 'hidden'
                  }`}
                />
              </div>
            </div>
          );
        })}
        <div
          onClick={() => add(new Metronome())}
          className="col-span-2 m-3 flex cursor-pointer items-center gap-2  "
        >
          <div className="w-full rounded-sm border-[1px] border-neutral-300 p-4 py-3 dark:border-neutral-900">
            Add a Section
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sequencer;

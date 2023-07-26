import getTempoName from '../../../helpers/getTempoName';
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
    <div className="flex select-none flex-col gap-2 text-black dark:text-white">
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
                className={`duration-75 hover:bg-neutral-200 dark:hover:bg-neutral-800 ${
                  selected &&
                  'bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white'
                } w-full p-4 py-3`}
              >
                {getTempoName(metronome.bpm)} for {metronome.lengthInBars} bars
              </div>
            </div>
          );
        })}
        <div
          onClick={() => add(new Metronome())}
          className="col-span-2 m-3 flex cursor-pointer items-center gap-2 text-black dark:text-white"
        >
          <div className="w-full rounded-lg border-2 border-neutral-300 p-4 py-3 dark:border-neutral-900">
            Add a Section
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sequencer;

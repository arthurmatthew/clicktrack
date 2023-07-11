import Clicktrack from '../../classes/clicktrack';
import { Metronome } from '../../classes/metronome';

const Selected = ({
  selected,
}: {
  selected: Clicktrack['data']['children'][number] | undefined;
}) => {
  if (selected) return <ViewSection selected={selected} />;
};

const ViewSection = ({ selected }: { selected: Metronome }) => {
  return selected ? (
    <div>
      <div className="mb-2">
        <button className="rounded-sm bg-red-500 p-2 px-4 text-slate-200">
          Delete
        </button>
      </div>
      <h1>{selected.id}</h1>
      <h1>{selected.bpm} BPM</h1>
    </div>
  ) : (
    <h1>Something went wrong.</h1>
  );
};

export default Selected;

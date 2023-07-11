import Clicktrack from '../../classes/clicktrack';
import { Metronome, Repeat } from '../../classes/metronome';

const Selected = ({
  selected,
}: {
  selected: Clicktrack['data']['children'][number] | undefined;
}) => {
  if ((selected as Metronome).timeSignature != undefined) {
  }
};

const ViewSection = ({ selected }: { selected: Metronome }) => {
  return selected ? (
    <div>
      <h1>{selected.id}</h1>
      <h1>{selected.bpm} BPM</h1>
    </div>
  ) : (
    <h1>Something went wrong.</h1>
  );
};

export default Selected;

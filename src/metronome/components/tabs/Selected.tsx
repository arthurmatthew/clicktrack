import Clicktrack from '../../classes/clicktrack';

const Selected = ({
  selected,
}: {
  selected: Clicktrack['data']['children'][number] | undefined;
}) => {
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

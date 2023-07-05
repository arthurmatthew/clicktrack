import getTempoName from '../../../helpers/getTempoName';
import Metronome from '../../metronome';
import Panel from './Panel';

const Time = ({ metronome }: { metronome: Metronome }) => {
  return (
    <Panel title="Time">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-4xl">BPM: {metronome.data.bpm}</h1>
        <h2 className="text-2xl">{getTempoName(metronome.data.bpm)}</h2>
      </div>
    </Panel>
  );
};

export default Time;

import { IMetronomeUpdater } from './IMetronomeUpdater';
import { TempoIncrementButton } from './TempoIncrementButton';

export const TempoIncrementers = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  return (
    <div className="flex flex-grow items-center justify-between">
      <div className="flex w-full overflow-hidden rounded-sm">
        <TempoIncrementButton
          selected={metronome}
          updateMetronome={updateMetronome}
          amount={-5}
          icon="rewind-fill"
        />
        <TempoIncrementButton
          selected={metronome}
          updateMetronome={updateMetronome}
          amount={-1}
          icon="caret-left-fill"
        />
      </div>

      <div className="select-none">
        <div className="flex h-full flex-col items-center justify-center px-2">
          <h1 className="roboto w-20 bg-transparent text-center text-4xl">
            {metronome.bpm}
          </h1>
        </div>
      </div>
      <div className="flex w-full overflow-hidden rounded-sm">
        <TempoIncrementButton
          selected={metronome}
          updateMetronome={updateMetronome}
          amount={1}
          icon="caret-right-fill"
        />
        <TempoIncrementButton
          selected={metronome}
          updateMetronome={updateMetronome}
          amount={5}
          icon="fast-forward-fill"
        />
      </div>
    </div>
  );
};

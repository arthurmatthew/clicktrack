import { IMetronomeUpdater } from './IMetronomeUpdater';
import { TimeSignatureButton } from './TimeSignatureButton';

const timeSignatures: [beats: number, value: number][] = [
  [4, 4],
  [3, 4],
  [5, 4],
  [2, 4],
  [2, 2],
  [12, 8],
];

export const EditTimeSignature = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  return (
    <div>
      <div className="lora grid grid-cols-3 gap-px overflow-hidden rounded-sm border-[1px] border-neutral-200 bg-neutral-200 text-2xl font-semibold dark:border-neutral-900 dark:bg-neutral-900">
        {timeSignatures.map((timeSignature) => (
          <TimeSignatureButton
            key={JSON.stringify(timeSignature)}
            onClick={() =>
              updateMetronome(metronome, { timeSignature: timeSignature })
            }
            selected={
              JSON.stringify(metronome.timeSignature) ==
              JSON.stringify(timeSignature)
            }
            time={timeSignature}
          />
        ))}
      </div>
    </div>
  );
};

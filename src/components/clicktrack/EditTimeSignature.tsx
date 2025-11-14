import { useState } from 'react';
import { IMetronomeUpdater } from './IMetronomeUpdater';
import { TimeSignatureButton } from './TimeSignatureButton';
import { TimeSignatureShowMore } from './TimeSignatureShowMore';
import { EditCustomTimeSignature } from './EditCustomTimeSignature';
import { METRONOME_TIME_SIGNATURES } from '../../config';

export const EditTimeSignature = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  const first3TimeSignatures = METRONOME_TIME_SIGNATURES.slice(0, 3);
  const restOfTimeSignatures = METRONOME_TIME_SIGNATURES.slice(3);

  const [showingMore, setShowingMore] = useState(false);

  return (
    <div>
      <div className="lora grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-zinc-200 bg-zinc-200 text-2xl font-semibold dark:border-zinc-900 dark:bg-zinc-900">
        <EditCustomTimeSignature {...{ metronome, updateMetronome }} />
        {first3TimeSignatures.map((timeSignature) => (
          <TimeSignatureButton
            key={JSON.stringify(timeSignature)}
            onClick={() => {
              updateMetronome(metronome, { timeSignature: timeSignature });
            }}
            selected={
              JSON.stringify(metronome.timeSignature) ==
              JSON.stringify(timeSignature)
            }
            time={timeSignature}
          />
        ))}
        {showingMore &&
          restOfTimeSignatures.map((timeSignature) => (
            <TimeSignatureButton
              key={JSON.stringify(timeSignature)}
              onClick={() => {
                updateMetronome(metronome, { timeSignature: timeSignature });
              }}
              selected={
                JSON.stringify(metronome.timeSignature) ==
                JSON.stringify(timeSignature)
              }
              time={timeSignature}
            />
          ))}
        <TimeSignatureShowMore
          showingMore={showingMore}
          onClick={() => {
            setShowingMore((previouslyShowingMore) => !previouslyShowingMore);
          }}
        />
      </div>
    </div>
  );
};

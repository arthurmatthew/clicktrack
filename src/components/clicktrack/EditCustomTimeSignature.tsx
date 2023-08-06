import { NumberInput } from '../core/NumberInput';
import { IMetronomeUpdater } from './IMetronomeUpdater';

export const EditCustomTimeSignature = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  const increaseNumerator = () =>
    updateMetronome(metronome, {
      timeSignature: [
        metronome.timeSignature[0] + 1,
        metronome.timeSignature[1],
      ],
    });
  const decreaseNumerator = () =>
    updateMetronome(metronome, {
      timeSignature: [
        metronome.timeSignature[0] - 1,
        metronome.timeSignature[1],
      ],
    });

  const increaseDenominator = () =>
    updateMetronome(metronome, {
      timeSignature: [
        metronome.timeSignature[0],
        metronome.timeSignature[1] + 1,
      ],
    });
  const decreaseDenominator = () =>
    updateMetronome(metronome, {
      timeSignature: [
        metronome.timeSignature[0],
        metronome.timeSignature[1] - 1,
      ],
    });

  return (
    <div className="flex flex-col gap-1">
      <NumberInput
        label="Time Signature"
        value={metronome.timeSignature[0]}
        increase={increaseNumerator}
        decrease={decreaseNumerator}
      />
      <NumberInput
        value={metronome.timeSignature[1]}
        increase={increaseDenominator}
        decrease={decreaseDenominator}
      />
    </div>
  );
};

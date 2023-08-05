import { NumberInput } from '../core/NumberInput';
import { IMetronomeUpdater } from './IMetronomeUpdater';

export const EditLength = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  const increase = () =>
    updateMetronome(metronome, { lengthInBars: metronome.lengthInBars + 1 });
  const decrease = () =>
    updateMetronome(metronome, { lengthInBars: metronome.lengthInBars - 1 });

  return (
    <NumberInput
      label="Length"
      value={metronome.lengthInBars}
      {...{ increase, decrease }}
    />
  );
};

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
      label="Length (bars)"
      value={metronome.lengthInBars}
      set={(value) => updateMetronome(metronome, { lengthInBars: value })}
      {...{ increase, decrease }}
    />
  );
};

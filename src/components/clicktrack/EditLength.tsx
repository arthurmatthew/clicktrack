import { useNotify } from '../../hooks/useNotify';
import { validateLength } from '../../utils/validators/validateLength';
import { NumberInput } from '../core/NumberInput';
import { IMetronomeUpdater } from './IMetronomeUpdater';

export const EditLength = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  const { notify } = useNotify();
  const prevLength = metronome.lengthInBars;

  const increase = () =>
    validateLength(prevLength + 1, notify) &&
    updateMetronome(metronome, { lengthInBars: prevLength + 1 });
  const decrease = () =>
    validateLength(prevLength - 1, notify) &&
    updateMetronome(metronome, { lengthInBars: prevLength - 1 });

  return (
    <NumberInput
      label="Length (bars)"
      value={metronome.lengthInBars}
      set={(value) => updateMetronome(metronome, { lengthInBars: value })}
      {...{ increase, decrease }}
    />
  );
};

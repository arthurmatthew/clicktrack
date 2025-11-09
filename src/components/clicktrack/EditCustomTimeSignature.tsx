import { useNotify } from '../../hooks/useNotify';
import { validateTimeSignature } from '../../utils/validators/validateTimeSignature';
import { CustomTimeSignatureRow } from './CustomTimeSignatureRow';
import { IMetronomeUpdater } from './IMetronomeUpdater';

export const EditCustomTimeSignature = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  const { notify } = useNotify();
  const prevNumerator = metronome.timeSignature[0];
  const prevDenominator = metronome.timeSignature[1];

  const increaseNumerator = () => {
    validateTimeSignature(prevNumerator + 1, notify) &&
      updateMetronome(metronome, {
        timeSignature: [prevNumerator + 1, prevDenominator],
      });
  };
  const increaseDenominator = () => {
    validateTimeSignature(prevDenominator * 2, notify) &&
      updateMetronome(metronome, {
        timeSignature: [prevNumerator, prevDenominator * 2],
      });
  };
  const decreaseNumerator = () => {
    validateTimeSignature(prevNumerator - 1, notify) &&
      updateMetronome(metronome, {
        timeSignature: [prevNumerator - 1, prevDenominator],
      });
  };
  const decreaseDenominator = () => {
    validateTimeSignature(prevDenominator / 2, notify) &&
      updateMetronome(metronome, {
        timeSignature: [prevNumerator, prevDenominator / 2],
      });
  };

  return (
    <div className="row-span-2 flex h-full w-full flex-col items-center justify-center gap-1 border-zinc-200 bg-white text-2xl dark:border-zinc-900 dark:bg-black sm:gap-2 sm:text-3xl">
      <CustomTimeSignatureRow
        increase={increaseNumerator}
        decrease={decreaseNumerator}
        number={metronome.timeSignature[0]}
      />
      <CustomTimeSignatureRow
        increase={increaseDenominator}
        decrease={decreaseDenominator}
        number={metronome.timeSignature[1]}
      />
    </div>
  );
};

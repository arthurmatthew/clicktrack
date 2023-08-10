import { validateTimeSignature } from '../../utils/validators/validateTimeSignature';
import { CustomTimeSignatureRow } from './CustomTimeSignatureRow';
import { IMetronomeUpdater } from './IMetronomeUpdater';

export const EditCustomTimeSignature = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  const prevNumerator = metronome.timeSignature[0];
  const prevDenominator = metronome.timeSignature[1];

  const increaseNumerator = () =>
    validateTimeSignature(prevNumerator + 1) &&
    updateMetronome(metronome, {
      timeSignature: [prevNumerator + 1, prevDenominator],
    });
  const increaseDenominator = () =>
    validateTimeSignature(prevDenominator + 1) &&
    updateMetronome(metronome, {
      timeSignature: [prevNumerator, prevDenominator + 1],
    });
  const decreaseNumerator = () =>
    validateTimeSignature(prevNumerator - 1) &&
    updateMetronome(metronome, {
      timeSignature: [prevNumerator - 1, prevDenominator],
    });
  const decreaseDenominator = () =>
    validateTimeSignature(prevDenominator - 1) &&
    updateMetronome(metronome, {
      timeSignature: [prevNumerator, prevDenominator - 1],
    });

  return (
    <div className="row-span-2 flex h-full w-full flex-col items-center justify-center gap-1 border-neutral-200 bg-white text-2xl dark:border-neutral-900 dark:bg-black sm:gap-2 sm:text-3xl">
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

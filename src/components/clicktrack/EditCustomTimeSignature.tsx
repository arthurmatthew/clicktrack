import { validateTimeSignature } from '../../utils/validators/validateTimeSignature';
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
    <div className="row-span-2 flex h-full w-full flex-col items-center justify-center gap-2 border-neutral-200 bg-white text-3xl dark:border-neutral-900 dark:bg-black">
      <div className="flex items-center gap-2">
        <button
          onClick={increaseNumerator}
          className="flex aspect-square h-7 items-center justify-center rounded-full bg-neutral-900"
        >
          <i className="bi-plus leading-[0]" />
        </button>
        <h1 className="w-14 text-center leading-[0]">
          {metronome.timeSignature[0]}
        </h1>
        <button
          onClick={decreaseNumerator}
          className="flex aspect-square h-7 items-center justify-center rounded-full bg-neutral-900"
        >
          <i className="bi-dash leading-[0]" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={increaseDenominator}
          className="flex aspect-square h-7 items-center justify-center rounded-full bg-neutral-900"
        >
          <i className="bi-plus leading-[0]" />
        </button>
        <h1 className="w-14 text-center leading-[0]">
          {metronome.timeSignature[1]}
        </h1>
        <button
          onClick={decreaseDenominator}
          className="flex aspect-square h-7 items-center justify-center rounded-full bg-neutral-900"
        >
          <i className="bi-dash leading-[0]" />
        </button>
      </div>
    </div>
  );
};

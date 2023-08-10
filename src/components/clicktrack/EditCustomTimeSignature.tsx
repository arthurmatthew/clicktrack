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
    <div className="row-span-2 flex h-full w-full flex-col items-center justify-center border-neutral-200 bg-white text-4xl dark:border-neutral-900 dark:bg-black">
      <h2 className="inter text-xs font-normal opacity-50">Beats</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={increaseNumerator}
          className="flex aspect-square h-7 items-center justify-center rounded-full bg-neutral-900"
        >
          <i className="bi-plus-lg text-xl leading-[0]" />
        </button>
        <h1 className="w-14 text-center">{metronome.timeSignature[0]}</h1>
        <button
          onClick={decreaseNumerator}
          className="flex aspect-square h-7 items-center justify-center rounded-full bg-neutral-900"
        >
          <i className="bi-dash-lg text-xl leading-[0]" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={increaseDenominator}
          className="flex aspect-square h-7 items-center justify-center rounded-full bg-neutral-900"
        >
          <i className="bi-plus-lg text-xl leading-[0]" />
        </button>
        <h1 className="w-14 text-center">{metronome.timeSignature[1]}</h1>
        <button
          onClick={decreaseDenominator}
          className="flex aspect-square h-7 items-center justify-center rounded-full bg-neutral-900"
        >
          <i className="bi-dash-lg text-xl leading-[0]" />
        </button>
      </div>
      <h2 className="inter text-xs font-normal opacity-50">Value</h2>
    </div>
  );
};

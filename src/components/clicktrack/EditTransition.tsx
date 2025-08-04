import { motion } from 'framer-motion';
import { Transition } from '../../models/Transition';
import { TCurveTypes } from '../../types';
import { NumberInput } from '../core/NumberInput';
import { useNotify } from '../../hooks/useNotify';
import { validateLength } from '../../utils/validators/validateLength';

interface IEditTransition {
  updateTransition: (
    metronome: Transition,
    update: Partial<Transition>
  ) => void;
  transition: Transition | undefined;
}

const curves: [TCurveTypes, string][] = [
  ['linear', 'Linear'],
  ['ease-in', 'Ease In'],
  ['ease-out', 'Ease Out'],
  ['custom', 'Custom'],
];

export const EditTransition = ({
  updateTransition,
  transition,
}: IEditTransition) => {
  const { notify } = useNotify();

  if (transition) {
    const prevLength = transition.lengthInBars;

    const increase = () => {
      {
        validateLength(prevLength + 1, notify) &&
          updateTransition(transition, { lengthInBars: prevLength + 1 });
      }
    };
    const decrease = () => {
      {
        validateLength(prevLength - 1, notify) &&
          updateTransition(transition, { lengthInBars: prevLength - 1 });
      }
    };

    return (
      <motion.div
        className="flex flex-col gap-px overflow-hidden rounded-sm text-lg sm:gap-2 sm:overflow-visible sm:rounded-none"
        initial={{ opacity: 0, filter: 'blur(2px)' }}
        animate={{ opacity: 100, filter: 'blur(0)' }}
        transition={{ duration: 0.2 }}
      >
        {transition.fromMetronome &&
        transition.toMetronome &&
        transition.timeSignature &&
        transition.accentMap ? (
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              <h3 className="opacity-50">Inherit Time Signature</h3>
              <div className="flex bg-zinc-900">
                <div className="lora flex flex-col items-center justify-center bg-zinc-800 p-3 px-6 text-2xl font-black leading-none">
                  <span>{transition.timeSignature[0]}</span>
                  <span>{transition.timeSignature[1]}</span>
                </div>
                <div className="grid grid-rows-2 gap-px p-px pl-0">
                  <button
                    onClick={() =>
                      updateTransition(transition, {
                        inheritTimeSignature: 'previous',
                      })
                    }
                    className={`p-2 px-4 ${
                      transition.inheritTimeSignature === 'previous'
                        ? 'bg-zinc-900'
                        : 'bg-black'
                    }`}
                  >
                    From Previous
                  </button>
                  <button
                    onClick={() =>
                      updateTransition(transition, {
                        inheritTimeSignature: 'next',
                      })
                    }
                    className={`p-2 px-4 ${
                      transition.inheritTimeSignature === 'next'
                        ? 'bg-zinc-900'
                        : 'bg-black'
                    }`}
                  >
                    From Next
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="opacity-50">Inherit Accents</h3>
              <div className="flex bg-zinc-900">
                <div className="grid grid-rows-2 gap-px p-px">
                  <button
                    onClick={() =>
                      updateTransition(transition, {
                        inheritAccentMap: 'previous',
                      })
                    }
                    className={`p-2 px-4 ${
                      transition.inheritAccentMap === 'previous'
                        ? 'bg-zinc-900'
                        : 'bg-black'
                    }`}
                  >
                    From Previous
                  </button>
                  <button
                    onClick={() =>
                      updateTransition(transition, {
                        inheritAccentMap: 'next',
                      })
                    }
                    className={`p-2 px-4 ${
                      transition.inheritAccentMap === 'next'
                        ? 'bg-zinc-900'
                        : 'bg-black'
                    }`}
                  >
                    From Next
                  </button>
                </div>
              </div>
            </div>
            <p className=" max-w-lg">
              Transitioning from the previous{' '}
              <span className="roboto mx-1 rounded-lg bg-zinc-900 p-1 px-3 text-sm">
                {transition.fromMetronome.bpm} BPM
              </span>
              section into the next{' '}
              <span className="roboto mx-1 rounded-lg bg-zinc-900 p-1 px-3 text-sm">
                {transition.toMetronome.bpm} BPM
              </span>{' '}
              section. Drag to reorder.
            </p>
          </div>
        ) : (
          <p>
            You must place the transition in between two Metronome sections.
          </p>
        )}

        <div className="flex flex-col gap-1">
          <h3 className="opacity-50">Transition Speed</h3>
          <div className="grid grid-cols-4 gap-px rounded-sm bg-zinc-900 p-px">
            {curves.map((curve) => (
              <button
                className={`p-8 ${
                  transition.curveType === curve[0] ? 'bg-zinc-900' : 'bg-black'
                }`}
                onClick={() =>
                  updateTransition(transition, { curveType: curve[0] })
                }
              >
                {curve[1]}
              </button>
            ))}
          </div>
          <NumberInput
            label="Length (bars)"
            value={transition.lengthInBars}
            set={(value) => {
              updateTransition(transition, { lengthInBars: value });
            }}
            {...{ increase, decrease }}
          />
        </div>
      </motion.div>
    );
  }
};

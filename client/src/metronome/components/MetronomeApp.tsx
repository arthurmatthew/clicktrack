import { useRef, useEffect } from 'react';
import Section from '../../types/app/metronomes/Section';

const MetronomeApp = ({ data }: { data: Section }) => {
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioCtx.current = new AudioContext();
    return () => {
      audioCtx.current = null;
    };
  }, []);

  const initOscillator = (osc: OscillatorNode) => {
    osc.frequency.value = 500;
    osc.type = 'sine';
  };

  const play = () => {
    if (audioCtx.current) {
      const oscillator = audioCtx.current.createOscillator();

      initOscillator(oscillator);
      oscillator.connect(audioCtx.current.destination);

      oscillator.start(audioCtx.current.currentTime);
      oscillator.stop(audioCtx.current.currentTime + 0.1);
    }
  };

  return (
    <div className="min-w-full flex-grow">
      <div className="mx-auto my-20 flex max-w-5xl flex-col items-center">
        <h1 className="text-5xl text-slate-900 dark:text-slate-200">
          {data.name}
        </h1>
        <button
          className="m-4 rounded-md bg-slate-300 p-8 px-10 text-xl font-semibold dark:bg-slate-600"
          onClick={play}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default MetronomeApp;

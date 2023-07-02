import { useRef, useEffect, useState } from 'react';
import Metronome, { Data } from '../metronome';
import { sounds } from '../sounds';

const MetronomeApp = ({ data }: { data: Metronome }) => {
  const audioCtx = useRef<AudioContext | null>(null);
  const [config, _setConfig] = useState<Data>(new Data({ note: ['B', 5] }));

  useEffect(() => {
    audioCtx.current = new AudioContext();
    return () => {
      audioCtx.current = null;
    };
  }, []);

  const play = (stopDuration: number) => {
    if (audioCtx.current) {
      const oscillator = audioCtx.current.createOscillator();
      const amp = audioCtx.current.createGain();

      sounds[2](oscillator);
      oscillator.frequency.value = config.frequency;
      oscillator.connect(amp);

      amp.gain.setValueAtTime(1, audioCtx.current.currentTime);
      amp.connect(audioCtx.current.destination);

      const stopTime = audioCtx.current.currentTime + stopDuration;

      oscillator.start(audioCtx.current.currentTime);
      amp.gain.exponentialRampToValueAtTime(0.0001, stopTime - 0.01);
      oscillator.stop(stopTime);
    }
  };

  return (
    <div className="min-w-full flex-grow">
      <div className="mx-auto my-20 flex max-w-5xl flex-col items-center">
        <h1 className="text-5xl text-slate-900 dark:text-slate-200">
          {data.name} at {config.frequency}
        </h1>
        <button
          className="m-4 rounded-md bg-slate-300 p-8 px-10 text-xl font-semibold dark:bg-slate-600"
          onClick={() => play(1)}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default MetronomeApp;

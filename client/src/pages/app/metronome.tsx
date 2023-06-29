import { useParams } from 'react-router-dom';
import { Section } from './metronomes';
import { useEffect, useRef } from 'react';

const Metronome = () => {
  const params = useParams();

  const getMetronome = (id: string) => {
    const metronomes = JSON.parse(
      localStorage.getItem('metronomes') as string
    ) as Section[];
    return metronomes.find((metronome) => metronome.id == id);
  };

  const metronome = getMetronome(decodeURIComponent(params.id as string));

  if (metronome != undefined) {
    return <MetronomeApp data={metronome} />;
  }

  return <NotFound />;
};

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
        <button onClick={play}>Play</button>
      </div>
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="min-w-full flex-grow">
      <div className="mx-auto my-20 flex max-w-5xl flex-col items-center gap-4 text-slate-900 dark:text-slate-200">
        <h1 className="text-3xl">We couldn't load your metronome</h1>
        <p className="text-xl opacity-80">
          It might not exist in your storage. Try again
        </p>
      </div>
    </div>
  );
};

export default Metronome;

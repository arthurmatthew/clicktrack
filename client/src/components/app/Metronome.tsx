import { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';

export const Metronome = ({ remove }: { remove: () => void }) => {
  const [sound, _setSound] = useState<number>(1);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, setPlaying] = useState<boolean>(false);

  const initializeAudio = () => {
    setAudio(() => {
      try {
        return new Audio('/sounds/' + sound + '.wav');
      } catch (err) {
        console.error(err);
        return new Audio('/sounds/1.wav');
      }
    });
  };

  useEffect(() => {
    initializeAudio();
    console.log('Audio Initialized');
  }, []);

  const playSound = () => {
    if (audio) {
      return audio.play();
    }
    console.error('No audio initialized');
  };

  const play = () => {
    setPlaying((playing) => {
      if (!playing) {
        playSound();
      }
      return !playing;
    });
  };

  useInterval(
    () => {
      playSound();
    },
    playing ? 1000 : null
  );

  return (
    <div className="mt-2 flex gap-2 rounded-md bg-slate-300 p-2 shadow-inner dark:bg-slate-700 dark:shadow-slate-800">
      <button
        onClick={play}
        className={`rounded-sm ${
          playing ? 'bg-red-300' : 'bg-green-300'
        } px-4 py-2`}
      >
        {playing ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={remove}
        className="rounded-sm bg-red-700 px-4 py-2 text-white"
      >
        Delete
      </button>
    </div>
  );
};

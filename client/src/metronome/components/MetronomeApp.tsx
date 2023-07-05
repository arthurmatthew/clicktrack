import React, { useRef, useEffect, useState } from 'react';
import Metronome from '../metronome';
import { sounds } from '../sounds';
import getFrequency from '../../helpers/app/metronomes/getFrequency';
import storage from '../../configs/storage.config';
import Playback from './panels/Playback';
import Time from './panels/Time';
import Options from './panels/Options';
import PanelRow from './panels/PanelRow';

const MetronomeApp = ({ data }: { data: Metronome }) => {
  const audioCtx = useRef<AudioContext | null>(null);
  const [metronome, setMetronome] = useState<Metronome>(data);

  useEffect(() => {
    audioCtx.current = new AudioContext();
    return () => {
      audioCtx.current = null;
    };
  }, []);

  // Handle metronome local storage update
  useEffect(() => {
    const prev = JSON.parse(
      localStorage.getItem(storage.key) as string
    ) as Metronome[];
    const updated = JSON.stringify([
      ...prev.filter((x) => x.id != metronome.id),
      metronome,
    ]);
    localStorage.setItem(storage.key, updated);
  }, [metronome]);

  const play = () => {
    if (audioCtx.current) {
      const oscillator = audioCtx.current.createOscillator();
      const amp = audioCtx.current.createGain();

      sounds[2](oscillator);
      oscillator.frequency.value = getFrequency(metronome.data.note);
      oscillator.connect(amp);

      amp.gain.setValueAtTime(1, audioCtx.current.currentTime);
      amp.connect(audioCtx.current.destination);

      const stopTime =
        audioCtx.current.currentTime + metronome.data.noteDuration;

      oscillator.start(audioCtx.current.currentTime);
      amp.gain.exponentialRampToValueAtTime(0.0001, stopTime - 0.01);
      oscillator.stop(stopTime);
    }
  };

  const incrementBpm = (amount: number) => {
    setMetronome(
      (prev) =>
        new Metronome({
          ...prev,
          data: { ...prev.data, bpm: prev.data.bpm + amount },
        })
    );
  };

  return (
    <div className="flex min-h-screen min-w-full flex-col text-slate-900 dark:text-slate-200">
      <div className="mx-auto my-7 flex max-w-5xl flex-col items-center gap-2">
        <h1 className="text-3xl">{metronome.name}</h1>
        <ul className="flex text-sm">
          <DataViewItem title={'ID'}>{metronome.id}</DataViewItem>
        </ul>
      </div>

      <div className="flex flex-grow flex-col gap-2 border-t-2 border-slate-300 p-2 dark:border-slate-700">
        <span className=""></span>
        <PanelRow>
          <Time metronome={metronome} />
          <Playback incrementBpm={incrementBpm} play={play} />
          <Options />
        </PanelRow>
      </div>
    </div>
  );
};

const DataViewItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <li className="px-2">
      {title}{' '}
      <span className="rounded-md bg-slate-300 px-1 dark:bg-slate-700">
        {children}
      </span>
    </li>
  );
};

export default MetronomeApp;

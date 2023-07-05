import React, { useRef, useEffect, useState } from 'react';
import Metronome from '../metronome';
import { sounds } from '../sounds';
import getFrequency from '../../helpers/app/metronomes/getFrequency';
import storage from '../../configs/storage.config';
import getTempoName from '../../helpers/getTempoName';

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
    <div className="flex min-w-full flex-grow flex-col">
      <div className="mx-auto my-7 flex max-w-5xl flex-col items-center gap-2">
        <h1 className="text-3xl text-slate-900 dark:text-slate-200">
          {metronome.name}
        </h1>
        <ul className="flex text-sm">
          <DataViewItem title={'ID'}>{metronome.id}</DataViewItem>
        </ul>
      </div>

      <div className="grid flex-grow grid-cols-4 grid-rows-3 gap-2 border-t-2 border-slate-300 p-2">
        <Panel title="Time">
          <div className="flex h-full flex-col items-center justify-center">
            <h1 className="text-4xl">BPM: {metronome.data.bpm}</h1>
            <h2 className="text-2xl">{getTempoName(metronome.data.bpm)}</h2>
          </div>
        </Panel>
        <Panel
          title="Playback"
          coords={[
            [2, 1],
            [4, 2],
          ]}
        >
          <div className="flex h-full items-center justify-center gap-5">
            <button onClick={() => incrementBpm(-5)}>
              <i className="bi-rewind-fill text-5xl text-purple-700" />
            </button>
            <button onClick={() => incrementBpm(-1)}>
              <i className="bi-caret-left-fill text-6xl text-purple-700" />
            </button>
            <button
              onClick={play}
              className="rounded-full bg-purple-700 p-6 text-5xl"
            >
              <i className="bi-play-fill text-purple-100" />
            </button>
            <button onClick={() => incrementBpm(1)}>
              <i className="bi-caret-right-fill text-6xl text-purple-700" />
            </button>
            <button onClick={() => incrementBpm(5)}>
              <i className="bi-fast-forward-fill text-5xl text-purple-700" />
            </button>
          </div>
        </Panel>
        <Panel title="Options" />
      </div>
    </div>
  );
};

const Panel = ({
  title,
  coords,
  children,
}: {
  title: string;
  coords?: [[startX: number, startY: number], [endX: number, endY: number]];
  children?: React.ReactNode;
}) => {
  const sx = coords && coords[0][0];
  const sy = coords && coords[0][1];
  const ex = coords && coords[1][0];
  const ey = coords && coords[1][1];

  return (
    <div
      style={{
        gridColumnStart: sx,
        gridColumnEnd: ex,
        gridRowStart: sy,
        gridRowEnd: ey,
      }}
      className={`flex flex-col rounded-md border-2 border-slate-300 shadow-2xl shadow-slate-300`}
    >
      <h1 className="w-full bg-slate-300 px-2 py-1 text-sm text-slate-800">
        {title}
      </h1>
      <div className="flex-grow">{children}</div>
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
      {title} <span className="rounded-md bg-slate-300 px-1">{children}</span>
    </li>
  );
};

export default MetronomeApp;

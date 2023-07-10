import { useRef, useEffect, useState } from 'react';
import Metronome from './metronome';
import storage from '../configs/storage.config';
import Window from './components/Window';
import { Routes, Route, Outlet } from 'react-router-dom';
import Redirect from '../components/routes/Redirect';
import DataViewItem from './components/DataViewItem';

const MetronomeApp = ({ data }: { data: Metronome }) => {
  const audioCtx = useRef<AudioContext | null>(null);
  const [metronome, _setMetronome] = useState<Metronome>(data);

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

  // const play = () => {
  //   if (audioCtx.current) {
  //     const oscillator = audioCtx.current.createOscillator();
  //     const amp = audioCtx.current.createGain();

  //     sounds[2](oscillator);
  //     oscillator.frequency.value = getFrequency(metronome.data.note);
  //     oscillator.connect(amp);

  //     amp.gain.setValueAtTime(
  //       metronome.data.volume == 0 ? 0.0001 : 1 * (metronome.data.volume / 100),
  //       audioCtx.current.currentTime
  //     );
  //     amp.connect(audioCtx.current.destination);

  //     const stopTime =
  //       audioCtx.current.currentTime + metronome.data.noteDuration;

  //     oscillator.start(audioCtx.current.currentTime);
  //     amp.gain.exponentialRampToValueAtTime(0.0001, stopTime - 0.01);
  //     oscillator.stop(stopTime);
  //   }
  // };

  return (
    <div className="flex min-h-screen min-w-full flex-col text-slate-900 dark:text-slate-200">
      <div className="mx-auto my-7 flex max-w-5xl flex-col items-center gap-2">
        <h1 className="text-3xl">{metronome.name}</h1>
        <ul className="flex text-sm">
          <DataViewItem title={'ID'}>{metronome.id}</DataViewItem>
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-2 px-2 pb-2">
        <Window>
          <h1>Selected Metronome</h1>
        </Window>
        <Window
          tabs={[
            { title: 'Playback', to: 'playback' },
            { title: 'Sequencer', to: 'sequencer' },
            { title: 'Settings', to: 'settings' },
          ]}
        >
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route element={<Redirect to="playback" />} path={'/*'} />
              <Route element={<h1>Settings</h1>} path="/settings" />
              <Route element={<h1>Playback</h1>} path="/playback" />
              <Route element={<h1>Sequencer</h1>} path="/sequencer" />
            </Route>
          </Routes>
        </Window>
      </div>
    </div>
  );
};

export default MetronomeApp;

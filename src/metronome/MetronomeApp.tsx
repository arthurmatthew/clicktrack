import { useRef, useEffect, useState } from 'react';
import Clicktrack from './classes/clicktrack';
import storage from '../configs/storage.config';
import Window from './components/Window';
import { Routes, Route, Outlet } from 'react-router-dom';
import DataViewItem from './components/DataViewItem';
import Sequencer from './components/tabs/Sequencer';
import Selected from './components/tabs/Selected';

const MetronomeApp = ({ data }: { data: Clicktrack }) => {
  const audioCtx = useRef<AudioContext | null>(null);
  const [clicktrack, setClicktrack] = useState<Clicktrack>(data);

  const [selectedId, setSelectedId] = useState<string>(
    clicktrack.data.children[0].id
  );

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
    ) as Clicktrack[];
    const updated = JSON.stringify([
      ...prev.filter((x) => x.id != clicktrack.id),
      clicktrack,
    ]);
    localStorage.setItem(storage.key, updated);
  }, [clicktrack]);

  const addSequenceChild = (child: Clicktrack['data']['children'][number]) => {
    setClicktrack(
      (prev) =>
        new Clicktrack({
          ...prev,
          data: { ...prev.data, children: [...prev.data.children, child] },
        })
    );
  };

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

  const updateBpm = (
    metronome: Clicktrack['data']['children'][number],
    amount: number,
    set?: number
  ) => {
    setClicktrack((prev) => {
      if (metronome.bpm + amount < 10 || (set && set < 10)) {
        return prev;
      }
      if (metronome.bpm + amount > 500 || (set && set > 500)) {
        return prev;
      }
      const id = metronome.id;
      const updated: Clicktrack['data']['children'][number] = {
        ...metronome,
        bpm: set ? set : metronome.bpm + amount,
      };
      return {
        ...prev,
        data: {
          ...prev.data,
          children: [...prev.data.children.filter((x) => x.id != id), updated],
        },
      };
    });
  };

  const updateTimeSignature = (
    metronome: Clicktrack['data']['children'][number],
    time: [beats: number, value: number]
  ) => {
    setClicktrack((prev) => {
      const updated: Clicktrack['data']['children'][number] = {
        ...metronome,
        timeSignature: time,
      };
      return {
        ...prev,
        data: {
          ...prev.data,
          children: [
            ...prev.data.children.filter((x) => x.id != metronome.id),
            updated,
          ],
        },
      };
    });
  };

  const deleteMetronome = (id: string) => {
    setClicktrack((prev) => {
      if (prev.data.children.length == 1) return prev;
      const updated = {
        ...prev,
        data: {
          ...prev.data,
          children: [...prev.data.children.filter((x) => x.id != id)],
        },
      };
      const indexOfId = prev.data.children.findIndex((x) => x.id == id);
      setSelectedId(
        updated.data.children[indexOfId]
          ? updated.data.children[indexOfId].id
          : updated.data.children[indexOfId - 1].id
      );
      return updated;
    });
  };

  return (
    <div className="flex min-h-screen min-w-full flex-col text-slate-900 dark:text-slate-200">
      <div className="mx-auto my-7 flex max-w-5xl flex-col items-center gap-2">
        <h1 className="text-3xl">{clicktrack.name}</h1>
        <ul className="flex text-sm">
          <DataViewItem title={'ID'}>{clicktrack.id}</DataViewItem>
        </ul>
      </div>
      <div className="grid gap-2 px-2 pb-2 lg:grid-cols-2">
        <Window tabs={[{ title: 'Edit Section' }]}>
          <Selected
            deleteMetronome={deleteMetronome}
            updateBpm={updateBpm}
            updateTime={updateTimeSignature}
            selected={clicktrack.data.children.find((x) => x.id == selectedId)}
          />
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
              <Route element={<h1>Settings</h1>} path="/settings" />
              <Route element={<h1>Playback</h1>} path="/playback" />
              <Route
                element={
                  <Sequencer
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    add={addSequenceChild}
                    sequence={clicktrack.data.children}
                  />
                }
                path="/sequencer"
              />
            </Route>
          </Routes>
        </Window>
      </div>
    </div>
  );
};

export default MetronomeApp;

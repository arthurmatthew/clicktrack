import { useRef, useEffect, useState } from 'react';
import Clicktrack from './classes/clicktrack';
import storage from '../configs/storage.config';
import Window from './components/Window';
import { Routes, Route, Outlet } from 'react-router-dom';
import DataViewItem from './components/DataViewItem';
import Sequencer from './components/tabs/Sequencer';
import EditSection from './components/tabs/EditSection';
import Playback from './components/tabs/Playback';
import { sounds } from './sounds';
import getFrequency from '../helpers/app/metronomes/getFrequency';

type Metronome = Clicktrack['data']['children'][number];

const MetronomeApp = ({ data }: { data: Clicktrack }) => {
  const [clicktrack, setClicktrack] = useState<Clicktrack>(data);

  // Settings
  const [selectedSoundNumber, _setSelectedSoundNumber] = useState(0);

  // Handle metronome local storage update
  useEffect(() => {
    const prev = JSON.parse(
      localStorage.getItem(storage.key) as string
    ) as Clicktrack[];
    const updated = JSON.stringify([
      ...prev.filter((metronome) => metronome.id != clicktrack.id),
      clicktrack,
    ]);
    localStorage.setItem(storage.key, updated);
  }, [clicktrack]);

  // Handle selecting different sequences
  const [selectedId, setSelectedId] = useState<string>(
    clicktrack.data.children[0].id
  );

  // Initialize Audio
  useEffect(() => {
    audioCtx.current = new AudioContext();
    return () => {
      audioCtx.current = null;
    };
  }, []);

  const addListedMetronome = (newMetronome: Metronome) => {
    setClicktrack(
      (previousClicktrack) =>
        new Clicktrack({
          ...previousClicktrack,
          data: {
            ...previousClicktrack.data,
            children: [...previousClicktrack.data.children, newMetronome],
          },
        })
    );
  };

  const updateListedMetronome = (
    metronome: Metronome,
    update: Partial<Omit<Metronome, 'id'>>
  ) => {
    setClicktrack((previousClicktrack) => {
      const indexBefore = previousClicktrack.data.children.findIndex(
        (thisMetronome) => thisMetronome.id == metronome.id
      );
      let updatedMetronomes = previousClicktrack.data.children.filter(
        (thisMetronome) => thisMetronome.id != metronome.id
      );
      updatedMetronomes.splice(indexBefore, 0, { ...metronome, ...update });

      return {
        ...previousClicktrack,
        data: {
          ...previousClicktrack.data,
          children: updatedMetronomes,
        },
      };
    });
  };

  // Metronome Begins Here ----------------
  const audioCtx = useRef<AudioContext | null>(null);

  let intervalWorker: Worker;

  const play = () => {
    if (audioCtx.current) {
      const oscillator = audioCtx.current.createOscillator();
      const amp = audioCtx.current.createGain();

      (sounds[selectedSoundNumber] || sounds[0])(oscillator);
      oscillator.frequency.value = getFrequency(clicktrack.data.note);
      oscillator.connect(amp);

      amp.gain.setValueAtTime(
        clicktrack.data.volume == 0
          ? 0.0001
          : 1 * (clicktrack.data.volume / 100),
        audioCtx.current.currentTime
      );
      amp.connect(audioCtx.current.destination);

      const stopTime =
        audioCtx.current.currentTime + clicktrack.data.noteDuration;

      oscillator.start(audioCtx.current.currentTime);
      amp.gain.exponentialRampToValueAtTime(0.0001, stopTime - 0.01);
      oscillator.stop(stopTime);
    }
  };

  const initializeMetronome = () => {
    intervalWorker = new Worker('./metronomeWorker.ts');
    intervalWorker.onmessage = (e: MessageEvent) => {
      if (e.data == 't') {
        console.log('Tick');
      } else {
        console.log(e.data);
      }
    };
    scheduler();
  };

  const scheduler = () => {};

  initializeMetronome();

  // Metronome Ends Here

  const deleteListedMetronome = (id: string) => {
    setClicktrack((previousClicktrack) => {
      if (previousClicktrack.data.children.length == 1)
        return previousClicktrack;
      const updated = {
        ...previousClicktrack,
        data: {
          ...previousClicktrack.data,
          children: [
            ...previousClicktrack.data.children.filter(
              (metronome) => metronome.id != id
            ),
          ],
        },
      };
      const indexOfId = previousClicktrack.data.children.findIndex(
        (metronome) => metronome.id == id
      );
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
          <EditSection
            deleteMetronome={deleteListedMetronome}
            updateMetronome={updateListedMetronome}
            selected={clicktrack.data.children.find(
              (metronome) => metronome.id == selectedId
            )}
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
              <Route element={<Playback play={play} />} path="/playback" />
              <Route
                element={
                  <Sequencer
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    add={addListedMetronome}
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

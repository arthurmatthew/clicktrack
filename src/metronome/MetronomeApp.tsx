import { useRef, useEffect, useState } from 'react';
import Clicktrack from './classes/clicktrack';
import storage from '../configs/storage.config';
import Window from './components/Window';
import { Routes, Route, Outlet } from 'react-router-dom';
import DataViewItem from './components/DataViewItem';
import Sequencer from './components/tabs/Sequencer';
import EditSection from './components/tabs/EditSection/EditSection';

type Metronome = Clicktrack['data']['children'][number];

const MetronomeApp = ({ data }: { data: Clicktrack }) => {
  const [clicktrack, setClicktrack] = useState<Clicktrack>(data);

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

  const addListedMetronome = (newMetronome: Metronome): void => {
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
  ): void => {
    setClicktrack((previousClicktrack) => {
      const indexBefore = previousClicktrack.data.children.findIndex(
        (thisMetronome) => thisMetronome.id == metronome.id
      );
      const updatedMetronomes = previousClicktrack.data.children.filter(
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

  let nextNoteTime: number;
  let noteType: number; // 0 = 16th; 1 = 8th; 2 == Quarter Note
  let noteLength: number;

  let noteQueue: [{ note: number; time: number }];

  let last16thNote: number;

  const schedule = (beat: number, time: number) => {
    if (audioCtx.current) {
      noteQueue.push({ note: beat, time: time });

      if (noteType == 1 && beat % 2) return;
      if (noteType == 2 && beat % 4) return;

      const oscillator = audioCtx.current.createOscillator();
      oscillator.connect(audioCtx.current.destination);
      if (beat % 16 === 0) {
        // beat 0
        oscillator.frequency.value = 880.0;
      } else if (beat % 4 === 0) {
        // quarter
        oscillator.frequency.value = 440.0;
      } else {
        // 16th notes
        oscillator.frequency.value = 220.0;
      }

      oscillator.start(time);
      oscillator.stop(time + noteLength);
    }
  };

  const scheduler = (): void => {
    if (audioCtx.current) {
      while (nextNoteTime < audioCtx.current.currentTime) {
        schedule(last16thNote, nextNoteTime);
      }
    }
  };

  const initializeMetronome = (): void => {
    intervalWorker = new Worker(
      new URL('./metronomeWorker.ts', import.meta.url),
      { type: 'module' }
    );
    intervalWorker.onmessage = (e: MessageEvent) => {
      if (e.data == 't') {
        console.log('Tick');
      } else {
        console.log(e.data);
      }
    };
  };

  const cleanUpMetronome = (): void => {
    intervalWorker.terminate();
  };

  useEffect(() => {
    initializeMetronome();
    return () => {
      cleanUpMetronome();
    };
  }, []);

  // Metronome Ends Here

  const deleteListedMetronome = (id: string): void => {
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
      <div className="mx-auto my-7 flex max-w-5xl items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl">{clicktrack.name}</h1>
          <ul className="flex text-sm">
            <DataViewItem title={'ID'}>{clicktrack.id}</DataViewItem>
          </ul>
        </div>
        <div className="mx-6 h-10 w-px bg-gradient-to-b from-transparent via-slate-600/50 to-transparent" />
        <div className="flex items-center gap-2">
          <button className="rounded-sm bg-purple-700 px-4 py-2 text-white">
            <i className="bi-play-fill" />
          </button>
          <button className="rounded-sm bg-slate-700 px-4 py-2 text-white">
            <i className="bi-share-fill" />
          </button>
          <button className="rounded-sm bg-slate-700 px-4 py-2 text-white">
            <i className="bi-gear-fill" />
          </button>
        </div>
      </div>
      <div className="grid gap-2 px-2 pb-2 lg:grid-cols-2">
        <Window
          tabs={[
            { title: 'Sequencer', to: 'sequencer' },
            { title: 'Settings', to: 'settings' },
          ]}
        >
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route element={<h1>Settings</h1>} path="/settings" />
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
        <Window tabs={[{ title: 'Edit' }]}>
          <EditSection
            deleteMetronome={deleteListedMetronome}
            updateMetronome={updateListedMetronome}
            selected={clicktrack.data.children.find(
              (metronome) => metronome.id == selectedId
            )}
          />
        </Window>
      </div>
    </div>
  );
};

export default MetronomeApp;

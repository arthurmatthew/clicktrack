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

  // Metronome Begins Here

  const audioCtx = useRef<AudioContext | null>(null);
  const [currentTempo, _setTempo] = useState<number>(120);

  const interval = useRef<number | null>();

  let unlocked = false;
  const [playingDisplay, setPlayingDisplay] = useState(false);

  let nextNoteDueIn: number;
  let current16thBeat: number; // Relative to the bar
  let noteType: number = 8; // 16 = 16th note, 4 = 4 (quarter) note, etc
  const schedulingFrequency = 25; // In milliseconds
  const metronomeSoundLength = 0.3; // In seconds
  const scheduleAheadTime = 0.1; // In seconds

  // Initialize Audio
  useEffect(() => {
    audioCtx.current = new AudioContext();
    return () => {
      audioCtx.current = null;
    };
  }, []);

  const schedule = (beat: number, time: number) => {
    if (audioCtx.current) {
      console.log(beat);
      if (noteType == 8 && beat % 2) return; // Not divisible by 2 means the current beat is not an 8th note
      if (noteType == 4 && beat % 4) return; // Note divisible by 4 means the current beat is not a 16th note

      const oscillator = audioCtx.current.createOscillator();
      const gain = audioCtx.current.createGain();

      gain.connect(audioCtx.current.destination);
      oscillator.connect(gain);

      if (beat === 0) {
        oscillator.frequency.value = 880.0;
      } else if (beat % 4 === 0) {
        // When divisible by 4 it is a quarter note
        oscillator.frequency.value = 440.0;
      } else {
        oscillator.frequency.value = 220.0;
      }

      // Give it a nicer sound by fading out.
      gain.gain.exponentialRampToValueAtTime(
        0.00001,
        time + metronomeSoundLength
      );

      oscillator.start(time);
      oscillator.stop(time + metronomeSoundLength);
    }
  };

  /**
   * The scheduler function handles scheduling. It checks if any notes are due to be scheduled, and schedules if need be.
   */
  const scheduler = (): void => {
    if (audioCtx.current) {
      // Schedule the next note when it is due earlier than our current time (and how far ahead we check, if any)
      while (nextNoteDueIn < audioCtx.current.currentTime + scheduleAheadTime) {
        schedule(current16thBeat, nextNoteDueIn); // Schedule note
        next(); // Advance beat number and next note due time
      }
    }
  };

  /**
   * The next function handles the advancement of the beat number and the time in which
   * the next 16th note is due.
   */
  const next = () => {
    const secondsPerBeat: number = 60.0 / currentTempo;
    const secondsPer16thNote = 0.25 * secondsPerBeat; // A quarter of a beat is a 16th note.

    nextNoteDueIn += secondsPer16thNote; // Add the length of another 16th note.
    current16thBeat++; // Increment the beat number

    // If the incremented beat number is 16, make it zero.
    // There is only room for 4 beats in a bar. There are 4 16th notes per beat.
    if (current16thBeat == 16) {
      current16thBeat = 0;
    }
  };

  /**
   * The play function toggles the metronome on or off. More specifically,
   * it sets and clears the interval which runs the scheduler function.
   */
  const play = () => {
    if (!audioCtx.current) audioCtx.current = new AudioContext();

    // Web Audio API requires user gesture to unlock audio.
    // We play a silent buffer beforehand so that our metronome
    // is not affected.
    if (!unlocked) {
      const buffer = audioCtx.current.createBuffer(1, 1, 22050);
      const node = audioCtx.current.createBufferSource();
      node.buffer = buffer;
      node.start(0);
      unlocked = true;
    }

    setPlayingDisplay((previouslyPlayingDisplay) => !previouslyPlayingDisplay);
    console.log(interval.current);

    if (!interval.current) {
      current16thBeat = 0;
      nextNoteDueIn = audioCtx.current.currentTime;
      interval.current = setInterval(() => {
        scheduler();
      }, schedulingFrequency);
      return;
    }

    clearInterval(interval.current);
    interval.current = null;
  };

  useEffect(() => {
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  // Metronome Ends Here

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
      <div className="mx-auto my-7 flex max-w-5xl flex-col items-center justify-center sm:flex-row">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl">{clicktrack.name}</h1>
          <ul className="flex text-sm">
            <DataViewItem title={'ID'}>{clicktrack.id}</DataViewItem>
          </ul>
        </div>
        <div className="my-3 h-px w-full bg-gradient-to-r from-transparent via-slate-600/50 to-transparent sm:mx-6 sm:h-10 sm:w-px sm:bg-gradient-to-b" />
        <div className="flex items-center gap-2">
          <button
            onClick={play}
            className="rounded-sm bg-purple-700 px-4 py-2 text-white"
          >
            <i className={playingDisplay ? 'bi-pause-fill' : 'bi-play-fill'} />
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

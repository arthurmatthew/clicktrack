import { useRef, useEffect, useState } from 'react';
import { Clicktrack } from './classes/clicktrack';
import { storage } from '../configs/storage.config';
import { Window } from './components/Window';
import { Routes, Route, Outlet } from 'react-router-dom';
import { DataViewItem } from './components/DataViewItem';
import { Sequencer } from './components/tabs/Sequencer';
import { Settings } from './components/popups/Settings';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { Metronome, Repeat } from './classes/section';
import { EditSection } from './components/tabs/EditSection/EditSection';
import { Data } from './classes/data';

export const MetronomeApp = ({
  loadedClicktrack,
}: {
  loadedClicktrack: Clicktrack;
}) => {
  const [clicktrack, setClicktrack] = useState<Clicktrack>(
    new Clicktrack({
      ...loadedClicktrack,
      data: new Data({
        ...loadedClicktrack.data,
        children: loadedClicktrack.data.children.map((section) => {
          switch (section.type) {
            case 'metronome':
              return new Metronome(section);
            case 'repeat':
              return new Repeat(section);
          }
        }),
      }),
    })
  );

  // Metronome Begins Here

  const audioCtx = useRef<AudioContext | null>(null);

  const interval = useRef<number | null>();

  let unlocked = false;
  const [playingDisplay, setPlayingDisplay] = useState(false);

  let nextNoteDueIn: number;
  let current16thBeat: number; // Relative to the bar
  let totalSectionsPlayed = 0;
  let totalBarsPlayed = 0;
  const schedulingFrequency = 25; // In milliseconds
  const metronomeSoundLength = 0.3; // In seconds
  const scheduleAheadTime = 0.1; // In seconds

  let selectedIdBeforePlaying: string;

  // Initialize Audio
  useEffect(() => {
    audioCtx.current = new AudioContext();
    return () => {
      audioCtx.current = null;
    };
  }, []);

  const schedule = (beat: number, time: number) => {
    if (!audioCtx.current) return;
    if (
      totalSectionsPlayed === clicktrack.data.children.length &&
      !clicktrack.data.playExtraBeat
    )
      return;

    const currentSection = clicktrack.data.children[totalSectionsPlayed];

    const noteType =
      currentSection instanceof Metronome && currentSection?.timeSignature[1];

    if (noteType === 8 && beat % 2) return; // Not divisible by 2 means the current beat is not an 8th note
    if (noteType === 4 && beat % 4) return; // Note divisible by 4 means the current beat is not a 16th note
    if (noteType === 2 && beat % 8) return;

    const oscillator = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();

    gain.gain.value = clicktrack.data.muted ? 0 : clicktrack.data.volume / 100;

    gain.connect(audioCtx.current.destination);
    oscillator.connect(gain);

    oscillator.frequency.value = 880.0;
    if (beat === 0) {
      oscillator.frequency.value = 880.0;
      pulseDisplay();
    } else if (beat % 4 === 0) {
      oscillator.frequency.value = 440.0;
      pulseDisplay();
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
    const currentSection = clicktrack.data.children[totalSectionsPlayed];
    if (currentSection instanceof Repeat) return;
    const secondsPerBeat: number = 60.0 / currentSection?.bpm;
    const secondsPer16thNote = 0.25 * secondsPerBeat; // A quarter of a beat is a 16th note.
    const barsInCurrentSection = currentSection?.lengthInBars;
    const quarterNotesPerBar =
      currentSection?.timeSignature[0] / (currentSection?.timeSignature[1] / 4);

    nextNoteDueIn += secondsPer16thNote; // Add the length of another 16th note.
    current16thBeat++; // Increment the beat number

    if (current16thBeat === quarterNotesPerBar * 4) {
      current16thBeat = 0;
      totalBarsPlayed++;
    }

    if (totalBarsPlayed === barsInCurrentSection) {
      totalBarsPlayed = 0;
      totalSectionsPlayed++;
    }

    if (!barsInCurrentSection) {
      interval.current && clearInterval(interval.current);
      interval.current = null;

      setSelectedId(selectedIdBeforePlaying);
      setPlayingDisplay(false);

      return;
    }

    setSelectedId(currentSection?.id);
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
      const dummyAudio = new Audio(
        'data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAFAAADqQAzMzMzMzMzMzMzMzMzMzMzMzMzZmZmZmZmZmZmZmZmZmZmZmZmZmaZmZmZmZmZmZmZmZmZmZmZmZmZmczMzMzMzMzMzMzMzMzMzMzMzMzM//////////////////////////8AAABQTEFNRTMuMTAwBLkAAAAAAAAAABUgJAMGQQAB4AAAA6kQum07AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDEKYPAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EMRTA8AAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxHyDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDEpgPAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=='
      );
      const buffer = audioCtx.current.createBuffer(1, 1, 22050);
      const node = audioCtx.current.createBufferSource();
      dummyAudio.play();
      node.buffer = buffer;
      node.start(0);
      unlocked = true;
    }

    setPlayingDisplay((previouslyPlayingDisplay) => !previouslyPlayingDisplay);

    if (!interval.current) {
      selectedIdBeforePlaying = selectedId;
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
    const storedClicktracks = JSON.parse(
      localStorage.getItem(storage.keys.clicktracks) as string
    ) as Clicktrack[];
    const updatedClicktracks = JSON.stringify([
      ...storedClicktracks.filter(
        (storedClicktrack) => storedClicktrack.id != clicktrack.id
      ),
      clicktrack,
    ]);
    localStorage.setItem(storage.keys.clicktracks, updatedClicktracks);
  }, [clicktrack]);

  // Handle selecting different sequences
  const [selectedId, setSelectedId] = useState<string>(
    clicktrack.data.children[0].id
  );

  const addSection = (newSection: Metronome | Repeat): void => {
    setClicktrack(
      (previousClicktrack) =>
        new Clicktrack({
          ...previousClicktrack,
          data: {
            ...previousClicktrack.data,
            children: [...previousClicktrack.data.children, newSection],
          },
        })
    );
  };

  const updateClicktrackData = (update: Partial<Clicktrack['data']>): void => {
    setClicktrack((previousClicktrack) => {
      const updatedData = new Data({
        ...previousClicktrack.data,
        ...update,
      });
      return new Clicktrack({
        ...previousClicktrack,
        data: updatedData,
      });
    });
  };

  const updateSection = <T extends Metronome | Repeat>(
    section: T,
    update: Partial<Omit<T, 'id' | 'type'>>
  ): void => {
    setClicktrack((previousClicktrack) => {
      const indexBefore = previousClicktrack.data.children.findIndex(
        (thisSection) => thisSection.id === section.id
      );
      const updatedSections = previousClicktrack.data.children.filter(
        (thisSection) => thisSection.id !== section.id
      );

      if (section instanceof Metronome) {
        updatedSections.splice(
          indexBefore,
          0,
          new Metronome({ ...section, ...update })
        );
      } else if (section instanceof Repeat) {
        updatedSections.splice(
          indexBefore,
          0,
          new Repeat({ ...section, ...update })
        );
      }

      return new Clicktrack({
        ...previousClicktrack,
        data: new Data({
          ...previousClicktrack.data,
          children: updatedSections,
        }),
      });
    });
  };

  const deleteListedMetronome = (id: string): void => {
    setClicktrack((previousClicktrack) => {
      if (previousClicktrack.data.children.length === 1)
        return previousClicktrack;
      const updated = new Clicktrack({
        ...previousClicktrack,
        data: new Data({
          ...previousClicktrack.data,
          children: [
            ...previousClicktrack.data.children.filter(
              (section) => section.id != id
            ),
          ].map((section) => {
            switch (section.type) {
              case 'metronome':
                return new Metronome(section);
              case 'repeat':
                return new Repeat(section);
            }
          }),
        }),
      });
      const indexOfId = previousClicktrack.data.children.findIndex(
        (section) => section.id === id
      );
      setSelectedId(
        updated.data.children[indexOfId]
          ? updated.data.children[indexOfId].id
          : updated.data.children[indexOfId - 1].id
      );
      return updated;
    });
  };

  const copyListedMetronome = (id: string) => {
    setClicktrack((previousClicktrack) => {
      const metronomeToCopy = previousClicktrack.data.children.find(
        (metronome) => metronome.id === id
      );
      const metronomeCopy = new Metronome({
        ...metronomeToCopy,
        id: undefined,
      });
      return {
        ...previousClicktrack,
        data: {
          ...previousClicktrack.data,
          children: [...previousClicktrack.data.children, metronomeCopy],
        },
      };
    });
  };

  const [settingsShown, setSettingsShown] = useState(false);

  const pulseControl = useAnimationControls();
  const pulseDisplay = () => {
    pulseControl.start({
      filter: ['hue-rotate(45deg)', 'hue-rotate(0)'],
      transition: { duration: 1, ease: 'easeOut' },
    });
  };

  return (
    <motion.div className="flex min-h-screen min-w-full flex-col">
      <div className="flex w-full items-center justify-center py-8">
        <div className="flex max-w-5xl flex-col items-center justify-center sm:flex-row">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl" onClick={pulseDisplay}>
              {clicktrack.name}
            </h1>
            <ul className="flex text-sm">
              <DataViewItem title={'ID'}>{clicktrack.id}</DataViewItem>
            </ul>
          </div>
          <div className="my-3 h-px w-full bg-gradient-to-r from-transparent via-neutral-600/50 to-transparent sm:mx-6 sm:h-10 sm:w-px sm:bg-gradient-to-b" />
          <div className="flex items-center gap-2">
            <motion.button
              onClick={play}
              animate={pulseControl}
              className="rounded-sm bg-purple-700 px-4 py-2 text-white"
            >
              <i
                className={playingDisplay ? 'bi-pause-fill' : 'bi-play-fill'}
              />
            </motion.button>
            <div
              onClick={() =>
                setSettingsShown((previouslyShown) => !previouslyShown)
              }
              className="rounded-sm bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
            >
              <i className="bi-gear-fill" />
            </div>
            <AnimatePresence>
              {settingsShown && (
                <Settings
                  clicktrack={clicktrack}
                  updateClicktrackData={updateClicktrackData}
                  hideSettings={() => {
                    setSettingsShown(false);
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="grid gap-2 px-2 lg:grid-cols-2">
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
                    add={addSection}
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
            copyMetronome={copyListedMetronome}
            updateSection={updateSection}
            selected={clicktrack.data.children.find(
              (metronome) => metronome.id === selectedId
            )}
          />
        </Window>
      </div>
    </motion.div>
  );
};

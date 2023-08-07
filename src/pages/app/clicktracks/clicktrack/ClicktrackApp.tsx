import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { STORAGE_KEYS_CLICKTRACK } from '../../../../config';
import { Title } from '../../../../components/clicktrack/Title';
import { Controls } from '../../../../components/clicktrack/Controls';
import { Clicktrack } from '../../../../models/clicktrack/Clicktrack';
import { ClicktrackData } from '../../../../models/clicktrack/ClicktrackData';
import { Metronome } from '../../../../models/clicktrack/Metronome';
import { Repeat } from '../../../../models/clicktrack/Repeat';

export const ClicktrackApp = ({
  loadedClicktrack,
}: {
  loadedClicktrack: Clicktrack;
}) => {
  const [clicktrack, setClicktrack] = useState<Clicktrack>(
    new Clicktrack({
      ...loadedClicktrack,
      data: new ClicktrackData({
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
  let repeatsTaken: number = 0;
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
    const currentSection = clicktrack.data.children[totalSectionsPlayed];
    const previousSection = clicktrack.data.children[totalSectionsPlayed - 1];
    const section = currentSection || previousSection;

    if (audioCtx.current === null) return;
    if (section === undefined) return;
    if (currentSection === undefined && clicktrack.data.playExtraBeat === false)
      return;
    if (section instanceof Repeat) return;

    const noteType = section.timeSignature[1];
    const oscillator = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();

    if (noteType === 8 && beat % 2) return; // Not divisible by 2 means the current beat is not an 8th note
    if (noteType === 4 && beat % 4) return; // Note divisible by 4 means the current beat is not a 16th note
    if (noteType === 2 && beat % 8) return;

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

    gain.connect(audioCtx.current.destination);
    oscillator.connect(gain);

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
        if (interval.current === null) break;
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
    const previousSection = clicktrack.data.children[totalSectionsPlayed - 1];
    const section = currentSection || previousSection;

    if (section instanceof Repeat) {
      if (section.infinite) {
        totalSectionsPlayed = 0;
        return;
      }
      if (repeatsTaken == section.times) {
        if (interval.current !== null) clearInterval(interval.current);
        interval.current = null;

        setSelectedId(selectedIdBeforePlaying);
        setPlayingDisplay(false);

        return;
      }
      if (repeatsTaken != section.times) totalSectionsPlayed = 0;
      repeatsTaken++;
      return;
    }

    if (section === undefined) {
      if (interval.current !== null) clearInterval(interval.current);
      interval.current = null;

      setSelectedId(selectedIdBeforePlaying);
      setPlayingDisplay(false);

      return;
    }

    const secondsPerBeat = 60.0 / section.bpm;
    const secondsPer16thNote = 0.25 * secondsPerBeat;
    const quarterNotesPerBar =
      section.timeSignature[0] / (section.timeSignature[1] / 4);

    nextNoteDueIn += secondsPer16thNote; // Add the length of another 16th note.
    current16thBeat++; // Increment the beat number

    if (current16thBeat === quarterNotesPerBar * 4) {
      current16thBeat = 0;
      totalBarsPlayed++;
    }
    if (totalBarsPlayed === section.lengthInBars) {
      totalBarsPlayed = 0;
      totalSectionsPlayed++;
    }
    if (currentSection === undefined) {
      totalSectionsPlayed++; // increase this to make previous section undefined
    }

    setSelectedId(section.id);
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
      localStorage.getItem(STORAGE_KEYS_CLICKTRACK) as string
    ) as Clicktrack[];
    const updatedClicktracks = JSON.stringify([
      ...storedClicktracks.filter(
        (storedClicktrack) => storedClicktrack.id !== clicktrack.id
      ),
      clicktrack,
    ]);
    localStorage.setItem(STORAGE_KEYS_CLICKTRACK, updatedClicktracks);
  }, [clicktrack]);

  // Handle selecting different sequences
  const [selectedId, setSelectedId] = useState<string>(
    clicktrack.data.children[0]?.id ?? ''
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
      const updatedData = new ClicktrackData({
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
        data: new ClicktrackData({
          ...previousClicktrack.data,
          children: updatedSections,
        }),
      });
    });
  };

  const deleteSection = (id: string): void => {
    setClicktrack((previousClicktrack) => {
      if (previousClicktrack.data.children.length === 1)
        return previousClicktrack;
      const updated = new Clicktrack({
        ...previousClicktrack,
        data: new ClicktrackData({
          ...previousClicktrack.data,
          children: [
            ...previousClicktrack.data.children.filter(
              (section) => section.id !== id
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
      setSelectedId(() => {
        const closestSection =
          updated.data.children[indexOfId] ??
          updated.data.children[indexOfId - 1];
        return closestSection?.id ?? '';
      });
      return updated;
    });
  };

  const copySection = (id: string) => {
    setClicktrack((previousClicktrack) => {
      const sectionToCopy = previousClicktrack.data.children.find(
        (section) => section.id === id
      );
      if (!sectionToCopy) return previousClicktrack;
      const sectionCopy = () => {
        switch (sectionToCopy?.type) {
          case 'metronome':
            return new Metronome({ ...sectionToCopy, id: undefined });
          case 'repeat':
            return new Repeat({ ...sectionToCopy, id: undefined });
        }
      };
      return {
        ...previousClicktrack,
        data: {
          ...previousClicktrack.data,
          children: [...previousClicktrack.data.children, sectionCopy()],
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
      <Title
        {...{
          clicktrack,
          play,
          playingDisplay,
          pulseDisplay,
          pulseControl,
          settingsShown,
          setSettingsShown,
          updateClicktrackData,
        }}
      />
      <Controls
        {...{
          clicktrack,
          selectedId,
          setSelectedId,
          addSection,
          updateSection,
          copySection,
          deleteSection,
        }}
      />
    </motion.div>
  );
};

import { useRef, useState, useEffect } from 'react';
import { useNotify } from '../hooks/useNotify';
import { Clicktrack } from '../models/Clicktrack';
import { Metronome } from '../models/Metronome';
import { Repeat } from '../models/Repeat';
import { Transition } from '../models/Transition';
import { TPlaybackState, TSection } from '../types';
import { getEffectiveBpm } from '../utils/getEffectiveBpm';
import { validatePlay } from '../utils/validators/validatePlay';
import { playClick } from './playClick';

export const usePlayClicktrack = (
  _clicktrack: Clicktrack,
  callback: () => void,
) => {
  const audioCtx = useRef<AudioContext | null>(null);
  const { notify } = useNotify();

  const interval = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const clicktrack = useRef<Clicktrack>(_clicktrack);
  const repeatsTaken = useRef<Map<string, number>>(new Map());

  const [selectedId, setSelectedId] = useState<string>(
    clicktrack.current.data.sections[0]?.id ?? '',
  );

  const nextNoteDueIn = useRef(0);
  const current16thBeat = useRef(0); // Relative to the bar
  const totalSectionsPlayed = useRef(0);
  const totalBarsPlayed = useRef(0);
  const schedulingFrequency = 25; // In milliseconds
  const scheduleAheadTime = 0.1; // In seconds

  const selectedIdBeforePlaying = useRef<string | undefined>(undefined);
  const pausedState = useRef<TPlaybackState | null>(null);

  useEffect(() => {
    clicktrack.current = _clicktrack;
  }, [_clicktrack]);

  // Create audio context on mount and store
  useEffect(() => {
    audioCtx.current = new AudioContext();
  }, []);

  const getCurrentSection = (): TSection | undefined => {
    const sections = clicktrack.current.data.sections;
    const current = sections[totalSectionsPlayed.current];
    const previous = sections[totalSectionsPlayed.current - 1];
    const lastMetronome = clicktrack.current.data.sections.findLast(
      (section) => section instanceof Metronome,
    ) as Metronome | undefined;

    return current || (previous instanceof Repeat ? lastMetronome : previous);
  };

  const schedule = (beat: number, time: number) => {
    const section = getCurrentSection();

    if (audioCtx.current === null) return;
    if (section === undefined) return;

    // if done and NOT supposed to play a final extra beat
    if (
      clicktrack.current.data.sections[totalSectionsPlayed.current] ===
        undefined &&
      !clicktrack.current.data.playExtraBeat
    )
      return;

    if (section instanceof Repeat) return;

    if (section instanceof Transition) {
      if (!section.fromMetronome) return;
      if (!section.toMetronome) return;
      if (!section.timeSignature) return;

      const currentBpm = getEffectiveBpm(
        section.fromMetronome.bpm,
        section.toMetronome.bpm,
        section.lengthInBars,
        section.timeSignature,
        section.curveType,
        totalBarsPlayed.current,
        current16thBeat.current,
      );

      if (!section.accentMap) return;

      const accent = section.accentMap[beat] ?? 0;
      if (accent <= 0) return;

      playClick(
        audioCtx.current,
        clicktrack.current,
        beat,
        accent,
        new Metronome({ ...section, bpm: currentBpm }),
        time,
        callback,
      );

      return;
    }

    const accent = section.accentMap[beat] ?? 0;
    if (accent <= 0) return;

    playClick(
      audioCtx.current,
      clicktrack.current,
      beat,
      accent,
      section,
      time,
      callback,
    );
  };

  const handleRepeat = (section: Repeat, index: number) => {
    if (repeatsTaken.current.get(section.id) === undefined)
      repeatsTaken.current.set(section.id, 0);

    const individualRepeatsTaken = repeatsTaken.current.get(
      section.id,
    ) as number;

    if (section.infinite) {
      totalSectionsPlayed.current = 0;
      return true;
    }
    if (individualRepeatsTaken == section.times) {
      totalSectionsPlayed.current = index + 1;
      return true;
    }
    if (individualRepeatsTaken != section.times) {
      // repeat back to start
      totalSectionsPlayed.current = 0;

      const sectionsBeforeThisRepeat = clicktrack.current.data.sections.slice(
        0,
        index,
      );
      const repeatsBeforeThisRepeat = sectionsBeforeThisRepeat.filter(
        (section) => section instanceof Repeat,
      );

      repeatsBeforeThisRepeat.forEach((repeat) =>
        repeatsTaken.current.set(repeat.id, 0),
      ); // reset all repeats before the current one so it truly repeats
    }

    repeatsTaken.current.set(section.id, individualRepeatsTaken + 1);
    return true;
  };

  /**
   * The next function handles the advancement of the beat number and the time in which
   * the next 16th note is due.
   */
  const next = () => {
    const section = getCurrentSection();

    if (section instanceof Repeat) {
      if (handleRepeat(section, totalSectionsPlayed.current)) return;
      return; // yes this is redundant but its functionally the same as the old logic just in case
    }

    if (section === undefined) {
      stop();
      return;
    }

    // ! PICK UP HERE, U NOT DONE WITH UI, OR FULL IMPLEMENTATION
    let bpm: number;

    if (section instanceof Metronome) {
      bpm = section.bpm;
    } else if (section instanceof Transition) {
      if (section.fromMetronome === undefined) return;
      if (section.toMetronome === undefined) return;
      if (section.timeSignature === undefined) return;

      bpm = getEffectiveBpm(
        section.fromMetronome.bpm,
        section.toMetronome.bpm,
        section.lengthInBars,
        section.timeSignature,
        section.curveType,
        totalBarsPlayed.current,
        current16thBeat.current,
      );
    } else {
      return;
    }

    if (section.timeSignature === undefined) return;

    const secondsPerBeat = 60.0 / bpm;
    const secondsPer16thNote = 0.25 * secondsPerBeat;
    const quarterNotesPerBar =
      section.timeSignature[0] / (section.timeSignature[1] / 4);

    nextNoteDueIn.current += secondsPer16thNote; // Add the length of another 16th note.
    current16thBeat.current++; // Increment the beat number

    if (current16thBeat.current >= quarterNotesPerBar * 4) {
      current16thBeat.current = 0;
      totalBarsPlayed.current++;
    }
    if (totalBarsPlayed.current === section.lengthInBars) {
      totalBarsPlayed.current = 0;
      totalSectionsPlayed.current++;
    }
    if (
      clicktrack.current.data.sections[totalSectionsPlayed.current] ===
      undefined
    ) {
      totalSectionsPlayed.current++; // increase this to make previous section undefined
    }

    setSelectedId(section.id);
  };

  /**
   * The scheduler function handles scheduling. It checks if any notes are due to be scheduled, and schedules if need be.
   */
  const scheduler = (): void => {
    if (audioCtx.current) {
      // Schedule the next note when it is due earlier than our current time (and how far ahead we check, if any)
      while (
        nextNoteDueIn.current <
        audioCtx.current.currentTime + scheduleAheadTime
      ) {
        if (interval.current === null) break;
        schedule(current16thBeat.current, nextNoteDueIn.current); // Schedule note
        next(); // Advance beat number and next note due time
      }
    }
  };

  const savePlaybackState = (): TPlaybackState => {
    return {
      current16thBeat: current16thBeat.current,
      totalSectionsPlayed: totalSectionsPlayed.current,
      totalBarsPlayed: totalBarsPlayed.current,
      repeatsTaken: new Map(repeatsTaken.current),
      selectedId: selectedId,
    };
  };

  const restorePlaybackState = (state: TPlaybackState) => {
    current16thBeat.current = state.current16thBeat;
    totalSectionsPlayed.current = state.totalSectionsPlayed;
    totalBarsPlayed.current = state.totalBarsPlayed;
    repeatsTaken.current = new Map(state.repeatsTaken);
    setSelectedId(state.selectedId);
  };

  const initializeFromSection = (sectionIndex: number) => {
    const sections = clicktrack.current.data.sections;

    if (sectionIndex < 0 || sectionIndex >= sections.length) {
      notify('Invalid section index', 'error');
      return false;
    }

    let barsToSkip = 0;
    for (let i = 0; i < sectionIndex; i++) {
      const section = sections[i];
      if (section instanceof Metronome || section instanceof Transition) {
        barsToSkip += section.lengthInBars;
      }
    }

    current16thBeat.current = 0;
    totalSectionsPlayed.current = sectionIndex;
    totalBarsPlayed.current = 0;
    repeatsTaken.current.clear();

    const targetSection = sections[sectionIndex];
    if (targetSection) {
      setSelectedId(targetSection.id);
    }

    return true;
  };

  /**
   * The play function toggles the metronome on or off. More specifically,
   * it sets and clears the interval which runs the scheduler function.
   */
  const play = async (startFromSectionIndex?: number) => {
    const shouldPlay = !interval.current;

    if (shouldPlay && !validatePlay(clicktrack.current.data.sections, notify))
      return;

    setIsPlaying(shouldPlay);

    if (shouldPlay) {
      if (!audioCtx.current) audioCtx.current = new AudioContext();

      if (isPaused && pausedState.current) {
        restorePlaybackState(pausedState.current);
        pausedState.current = null;
        setIsPaused(false);
      } else if (startFromSectionIndex !== undefined) {
        selectedIdBeforePlaying.current = selectedId;
        if (!initializeFromSection(startFromSectionIndex)) return;
      } else {
        selectedIdBeforePlaying.current = selectedId;
        current16thBeat.current = 0;
        totalSectionsPlayed.current = 0;
        totalBarsPlayed.current = 0;
        repeatsTaken.current.clear();
      }

      nextNoteDueIn.current = audioCtx.current.currentTime;

      interval.current = window.setInterval(() => {
        scheduler();
      }, schedulingFrequency);

      return;
    }

    stop();
  };

  const pause = () => {
    if (interval.current !== null) {
      clearInterval(interval.current);
      interval.current = null;
    }

    pausedState.current = savePlaybackState();

    setIsPlaying(false);
    setIsPaused(true);
  };

  const resume = () => {
    if (isPaused && pausedState.current) {
      play();
    }
  };

  const stop = () => {
    if (interval.current !== null) clearInterval(interval.current);
    interval.current = null;

    setSelectedId(selectedIdBeforePlaying.current ?? '');
    setIsPlaying(false);
    setIsPaused(false);
    pausedState.current = null;
    repeatsTaken.current.clear();

    current16thBeat.current = 0;
    nextNoteDueIn.current = 0;
    totalSectionsPlayed.current = 0;
    totalBarsPlayed.current = 0;
  };

  const playFromSection = (sectionId: string) => {
    const sectionIndex = clicktrack.current.data.sections.findIndex(
      (section) => section.id === sectionId,
    );

    if (sectionIndex === -1) {
      notify('Section not found', 'error');
      return;
    }

    if (interval.current !== null) {
      stop();
    }

    play(sectionIndex);
  };

  useEffect(
    () => () => {
      audioCtx.current = null;
      if (interval.current) clearInterval(interval.current);
    },
    [],
  );

  return {
    play,
    pause,
    resume,
    stop,
    playFromSection,
    isPlaying,
    isPaused,
    selectedId,
    setSelectedId,
  };
};

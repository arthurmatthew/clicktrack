import { useRef, useState, useEffect } from 'react';
import { Repeat } from '../../models/Repeat';
import { Clicktrack } from '../../models/Clicktrack';
import { validatePlay } from '../../utils/validators/validatePlay';
import { useNotify } from '../useNotify';
import { Metronome } from '../../models/Metronome';
import { playClick } from './playClick';
import { TSection } from '../../types';
import { Transition } from '../../models/Transition';
import { getEffectiveBpm } from '../../utils/getEffectiveBpm';

export const usePlayClicktrack = (
  _clicktrack: Clicktrack,
  callback: () => void
) => {
  const audioCtx = useRef<AudioContext | null>(null);
  const { notify } = useNotify();

  const interval = useRef<number | null>();

  const [playingDisplay, setPlayingDisplay] = useState(false);

  const clicktrack = useRef<Clicktrack>(_clicktrack);
  const repeatsTaken = useRef<Map<string, number>>(new Map());

  const [selectedId, setSelectedId] = useState<string>(
    clicktrack.current.data.sections[0]?.id ?? ''
  );

  const nextNoteDueIn = useRef(0);
  const current16thBeat = useRef(0); // Relative to the bar
  const totalSectionsPlayed = useRef(0);
  const totalBarsPlayed = useRef(0);
  const schedulingFrequency = 25; // In milliseconds
  const scheduleAheadTime = 0.1; // In seconds

  const selectedIdBeforePlaying = useRef<string | undefined>();

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
      (section) => section instanceof Metronome
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
        current16thBeat.current
      );

      const noteType = section.timeSignature[1];
      const divisor = 16 / noteType;
      if (beat % divisor !== 0) return;

      playClick(
        audioCtx.current,
        clicktrack.current,
        beat,
        new Metronome({ ...section, bpm: currentBpm }),
        time,
        callback
      );

      return;
    }

    // based on type of note and time sig, dont play beat if unnecessary cause this counts way more beats than you'll need to hear
    const noteType = section.timeSignature[1];
    const divisor = 16 / noteType;
    if (beat % divisor !== 0) return;

    playClick(
      audioCtx.current,
      clicktrack.current,
      beat,
      section,
      time,
      callback
    );
  };

  const handleRepeat = (section: Repeat, index: number) => {
    if (repeatsTaken.current.get(section.id) === undefined)
      repeatsTaken.current.set(section.id, 0);

    const individualRepeatsTaken = repeatsTaken.current.get(
      section.id
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
        index
      );
      const repeatsBeforeThisRepeat = sectionsBeforeThisRepeat.filter(
        (section) => section instanceof Repeat
      );

      repeatsBeforeThisRepeat.forEach((repeat) =>
        repeatsTaken.current.set(repeat.id, 0)
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
        current16thBeat.current
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

  /**
   * The play function toggles the metronome on or off. More specifically,
   * it sets and clears the interval which runs the scheduler function.
   */
  const play = async () => {
    const shouldPlay = !interval.current;

    if (shouldPlay && !validatePlay(clicktrack.current.data.sections, notify))
      return;

    setPlayingDisplay(shouldPlay);

    if (shouldPlay) {
      if (!audioCtx.current) audioCtx.current = new AudioContext();

      selectedIdBeforePlaying.current = selectedId;

      current16thBeat.current = 0;
      nextNoteDueIn.current = audioCtx.current.currentTime;
      totalSectionsPlayed.current = 0; // check here for future resume feature
      totalBarsPlayed.current = 0;

      interval.current = window.setInterval(() => {
        scheduler();
      }, schedulingFrequency);

      return;
    }

    stop();
  };

  const stop = () => {
    if (interval.current !== null) clearInterval(interval.current);
    interval.current = null;

    setSelectedId(selectedIdBeforePlaying.current ?? '');
    setPlayingDisplay(false);
    repeatsTaken.current.clear();

    current16thBeat.current = 0;
    nextNoteDueIn.current = 0;
    totalSectionsPlayed.current = 0;
    totalBarsPlayed.current = 0;
  };

  useEffect(
    () => () => {
      audioCtx.current = null;
      if (interval.current) clearInterval(interval.current);
    },
    []
  );

  return { play, playingDisplay, selectedId, setSelectedId };
};

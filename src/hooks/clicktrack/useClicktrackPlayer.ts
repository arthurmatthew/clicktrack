import { useRef, useState, useEffect } from 'react';
import { Repeat } from '../../models/Repeat';
import { Clicktrack } from '../../models/Clicktrack';
import { validatePlay } from '../../utils/validators/validatePlay';

export const useClicktrackPlayer = (
  _clicktrack: Clicktrack,
  callback: () => void
) => {
  const audioCtx = useRef<AudioContext | null>(null);

  const interval = useRef<number | null>();

  let unlocked = false;
  const [playingDisplay, setPlayingDisplay] = useState(false);

  const clicktrack = useRef<Clicktrack>(_clicktrack);

  const [selectedId, setSelectedId] = useState<string>(
    clicktrack.current.data.sections[0]?.id ?? ''
  );

  let nextNoteDueIn: number;
  let current16thBeat: number; // Relative to the bar
  let totalSectionsPlayed = 0;
  let totalBarsPlayed = 0;
  let repeatsTaken: number = 0;
  const schedulingFrequency = 25; // In milliseconds
  const metronomeSoundLength = 0.3; // In seconds
  const scheduleAheadTime = 0.1; // In seconds

  let selectedIdBeforePlaying: string;

  useEffect(() => {
    clicktrack.current = _clicktrack;
  }, [_clicktrack]);

  const schedule = (beat: number, time: number) => {
    const currentSection =
      clicktrack.current.data.sections[totalSectionsPlayed];
    const previousSection =
      clicktrack.current.data.sections[totalSectionsPlayed - 1];
    const section = currentSection || previousSection;

    if (audioCtx.current === null) return;
    if (section === undefined) return;
    if (
      currentSection === undefined &&
      clicktrack.current.data.playExtraBeat === false
    )
      return;
    if (section instanceof Repeat) return;

    const noteType = section.timeSignature[1];
    const oscillator = audioCtx.current.createOscillator();
    const masterGain = audioCtx.current.createGain();
    const localGain = audioCtx.current.createGain();

    const calculatedMasterVolume = 1 * (clicktrack.current.data.volume / 100);
    const masterVolume = clicktrack.current.data.muted
      ? 0
      : calculatedMasterVolume;
    const calculatedLocalVolume = 1 * (section.volume / 100);
    const localVolume = section.muted ? 0 : calculatedLocalVolume;

    if (noteType === 8 && beat % 2) return; // Not divisible by 2 means the current beat is not an 8th note
    if (noteType === 4 && beat % 4) return; // Note divisible by 4 means the current beat is not a 16th note
    if (noteType === 2 && beat % 8) return;

    oscillator.frequency.value = 440.0;
    if (beat === 0) {
      oscillator.frequency.value = 880.0;
      callback();
    }

    masterGain.gain.value = masterVolume;

    masterGain.connect(audioCtx.current.destination);
    localGain.connect(masterGain);
    oscillator.connect(localGain);

    // Give it a nicer sound by fading out.
    localGain.gain.setValueAtTime(localVolume, time);
    if (clicktrack.current.data.fadeOutSound) {
      localGain.gain.exponentialRampToValueAtTime(
        0.00001,
        time + metronomeSoundLength
      );
    }

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
    const currentSection =
      clicktrack.current.data.sections[totalSectionsPlayed];
    const previousSection =
      clicktrack.current.data.sections[totalSectionsPlayed - 1];
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

    if (!validatePlay(clicktrack.current.data.sections)) return;

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

  useEffect(
    () => () => {
      audioCtx.current = null;
      if (interval.current) clearInterval(interval.current);
    },
    []
  );

  return { play, playingDisplay, selectedId, setSelectedId };
};

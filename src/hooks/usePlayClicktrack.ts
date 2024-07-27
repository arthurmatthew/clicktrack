import { useRef, useState, useEffect } from 'react';
import { Repeat } from '../models/Repeat';
import { Clicktrack } from '../models/Clicktrack';
import { validatePlay } from '../utils/validators/validatePlay';
import { useNotify } from './useNotify';
import { Metronome } from '../models/Metronome';

const nulledAudioBuffer = new AudioBuffer({length:1, sampleRate: 44100})

export const usePlayClicktrack = (
  _clicktrack: Clicktrack,
  onClick: () => void
) => {
  const audioCtx = useRef<AudioContext | null>(null);
  const buffers = useRef<{noise:AudioBuffer, click:AudioBuffer}>({noise:nulledAudioBuffer, click:nulledAudioBuffer});
  const { notify } = useNotify();

  const interval = useRef<number | null>();

  const [playingDisplay, setPlayingDisplay] = useState(false);

  const clicktrack = useRef<Clicktrack>(_clicktrack);
  const repeatsTaken = useRef<Map<string, number>>(new Map());

  const [selectedId, setSelectedId] = useState<string>(
    clicktrack.current.data.sections[0]?.id ?? ''
  );

  let nextNoteDueIn: number;
  let current16thBeat: number; // Relative to the bar
  let totalSectionsPlayed = 0;
  let totalBarsPlayed = 0;
  const schedulingFrequency = 25; // In milliseconds
  const metronomeSoundLength = 0.3; // In seconds
  const scheduleAheadTime = 0.1; // In seconds

  const selectedIdBeforePlaying = useRef<string | undefined>();

  useEffect(() => {
    clicktrack.current = _clicktrack;
  }, [_clicktrack]);

  useEffect(() => {
    audioCtx.current = new AudioContext();

    const bufferSize = 2 * audioCtx.current.sampleRate;
    buffers.current.noise = audioCtx.current.createBuffer(1, bufferSize, audioCtx.current.sampleRate);
    const output = buffers.current.noise.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    void (async () =>
        buffers.current.click = await fetch('/sounds/click.wav')
          .then(res => res.arrayBuffer())
          .then(buffer => audioCtx.current?.decodeAudioData(buffer) ?? nulledAudioBuffer)
    )();

  }, []);

  const schedule = (beat: number, time: number) => {
    const currentSection =
      clicktrack.current.data.sections[totalSectionsPlayed];
    const previousSection =
      clicktrack.current.data.sections[totalSectionsPlayed - 1];
    const lastMetronomeSection = clicktrack.current.data.sections.findLast(
      (section) => section instanceof Metronome
    ) as Metronome | undefined;
    const section =
      currentSection ||
      (previousSection instanceof Repeat
        ? lastMetronomeSection
        : previousSection);

    if (audioCtx.current === null) return;
    if (section === undefined) return;
    if (currentSection === undefined && !clicktrack.current.data.playExtraBeat)
      return;
    if (section instanceof Repeat) return;

    const noteType = section.timeSignature[1];

    if (noteType === 8 && beat % 2) return; // Not divisible by 2 means the current beat is not an 8th note
    if (noteType === 4 && beat % 4) return; // Note divisible by 4 means the current beat is not a 16th note
    if (noteType === 2 && beat % 8) return;

    const calculatedMasterVolume = 1 * (clicktrack.current.data.volume / 100);
    const masterVolume = clicktrack.current.data.muted
      ? 0
      : calculatedMasterVolume;
    const calculatedLocalVolume = 1 * (section.volume / 100);
    const localVolume = section.muted ? 0 : calculatedLocalVolume;

    const [downbeatIsAccented, backbeatIsAccented] = section.accents;

    const isDownbeat = beat === 0;
    const isBackbeat = beat === 8;
    const isAccentedDownbeat = isDownbeat && downbeatIsAccented;
    const isAccentedBackbeat = isBackbeat && backbeatIsAccented;

    onClick();

    const oscillator = audioCtx.current.createOscillator();
    const whiteNoiseSource = audioCtx.current.createBufferSource();
    whiteNoiseSource.buffer = buffers.current.noise;
    const clickSource = audioCtx.current.createBufferSource();
    clickSource.buffer = buffers.current.click;

    const masterGain = audioCtx.current.createGain();
    const localGain = audioCtx.current.createGain();
    const relativeGain = audioCtx.current.createGain();

    oscillator.frequency.value = 440.0;
    if (isAccentedDownbeat || isAccentedBackbeat) {
      oscillator.frequency.value = 880.0;
    }

    masterGain.gain.value = masterVolume;
    relativeGain.gain.value = 3;

    masterGain.connect(audioCtx.current.destination);
    localGain.connect(masterGain);
    relativeGain.connect(localGain);

    oscillator.connect(localGain);
    whiteNoiseSource.connect(localGain);
    clickSource.connect(relativeGain);

    // Give it a nicer sound by fading out.
    localGain.gain.setValueAtTime(localVolume, time);
    if (clicktrack.current.data.fadeOutSound) {
      localGain.gain.exponentialRampToValueAtTime(
        0.00001,
        time + metronomeSoundLength
      );
    }

    //oscillator.start(time);
    //oscillator.stop(time + metronomeSoundLength);

    //whiteNoiseSource.start(time);

    clickSource.start(time);

  };

  /**
   * The next function handles the advancement of the beat number and the time in which
   * the next 16th note is due.
   */
  const next = () => {
    const sections = clicktrack.current.data.sections;
    const currentSection = sections[totalSectionsPlayed];
    const previousSection = sections[totalSectionsPlayed - 1];
    const lastMetronomeSection = sections.findLast(
      (section) => section instanceof Metronome
    ) as Metronome | undefined;

    const section =
      currentSection ||
      (previousSection instanceof Repeat
        ? lastMetronomeSection
        : previousSection);

    if (section instanceof Repeat) {
      if (repeatsTaken.current.get(section.id) === undefined)
        repeatsTaken.current.set(section.id, 0);

      const individualRepeatsTaken = repeatsTaken.current.get(
        section.id
      ) as number;

      if (section.infinite) {
        totalSectionsPlayed = 0;
        return;
      }
      if (individualRepeatsTaken == section.times) {
        totalSectionsPlayed = sections.indexOf(section) + 1;
        return;
      }
      if (individualRepeatsTaken != section.times) {
        // repeat back to start
        totalSectionsPlayed = 0;

        const sectionsBeforeThisRepeat = sections.slice(
          0,
          sections.indexOf(section)
        );
        const repeatsBeforeThisRepeat = sectionsBeforeThisRepeat.filter(
          (section) => section instanceof Repeat
        );

        repeatsBeforeThisRepeat.forEach((repeat) =>
          repeatsTaken.current.set(repeat.id, 0)
        ); // reset all repeats before the current one so it truly repeats
      }

      repeatsTaken.current.set(section.id, individualRepeatsTaken + 1);
      return;
    }

    if (section === undefined) {
      stop();
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
   * The play function toggles the metronome on or off. More specifically,
   * it sets and clears the interval which runs the scheduler function.
   */
  const play = async () => {
    if (
      !interval.current &&
      !validatePlay(clicktrack.current.data.sections, notify)
    )
      return;
    setPlayingDisplay((previouslyPlayingDisplay) => !previouslyPlayingDisplay);

    if (!interval.current) {
      if (!audioCtx.current) audioCtx.current = new AudioContext();

      selectedIdBeforePlaying.current = selectedId;
      current16thBeat = 0;
      nextNoteDueIn = audioCtx.current.currentTime;
      interval.current = setInterval(() => {
        scheduler();
      }, schedulingFrequency);
      return;
    }

    stop();
  };

  const stop = () => {
    if (interval.current !== null) clearInterval(interval.current);
    interval.current = null;

    setSelectedId(selectedIdBeforePlaying.current as string);
    setPlayingDisplay(false);

    repeatsTaken.current.clear();
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

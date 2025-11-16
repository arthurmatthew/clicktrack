import { Clicktrack } from '../models/Clicktrack';
import { Metronome } from '../models/Metronome';
import { Transition } from '../models/Transition';
import { audioBufferCache } from './audioBufferCache';

export const playClick = async (
  audioContext: AudioContext | OfflineAudioContext | null,
  clicktrack: Clicktrack,
  _beat: number,
  accent: number,
  section: Metronome | Transition,
  time: number,
  callback: () => void,
) => {
  const metronomeSoundLength = 0.3;

  if (audioContext === null) return;
  if (
    section instanceof Transition &&
    (section.toMetronome === undefined || section.fromMetronome === undefined)
  )
    return;

  const masterGain = audioContext.createGain();
  const localGain = audioContext.createGain();

  const masterVolume = clicktrack.data.muted ? 0 : clicktrack.data.volume / 100;
  let localVolume: number = 0; // will bug out if the section to or from is fucked

  if (section instanceof Metronome) {
    localVolume = section.muted ? 0 : section.volume / 100;
  } else {
    const from = section.fromMetronome!;
    localVolume = from.muted ? 0 : from.volume / 100;
  }

  masterGain.gain.value = masterVolume;
  masterGain.connect(audioContext.destination);
  localGain.connect(masterGain);

  if (accent === 3) {
    callback();
  }

  if (clicktrack.data.soundType === 'sample' && clicktrack.data.customSound) {
    playSample(audioContext, clicktrack, localGain, accent, time, localVolume);
  } else {
    playOscillator(
      audioContext,
      clicktrack,
      localGain,
      accent,
      time,
      localVolume,
      metronomeSoundLength,
    );
  }
};

const playOscillator = (
  audioContext: AudioContext | OfflineAudioContext,
  clicktrack: Clicktrack,
  localGain: GainNode,
  accent: number,
  time: number,
  localVolume: number,
  metronomeSoundLength: number,
) => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = clicktrack.data.wave;

  if (accent === 3) oscillator.frequency.value = 880;
  else if (accent === 2) oscillator.frequency.value = 440;
  else if (accent === 1) oscillator.frequency.value = 220;
  else return;

  oscillator.connect(localGain);

  localGain.gain.setValueAtTime(localVolume, time);
  if (clicktrack.data.fadeOutSound) {
    localGain.gain.exponentialRampToValueAtTime(
      0.00001,
      time + metronomeSoundLength,
    );
  }

  oscillator.start(time);
  oscillator.stop(time + metronomeSoundLength);
};

const playSample = (
  audioContext: AudioContext | OfflineAudioContext,
  clicktrack: Clicktrack,
  localGain: GainNode,
  accent: number,
  time: number,
  localVolume: number,
) => {
  if (!clicktrack.data.customSound?.url) return;
  if (accent === 0) return; // Don't play on accent 0

  // Get cached buffer (this is fast once cached)
  const buffer = audioBufferCache.getCachedBuffer(
    clicktrack.data.customSound.url,
  );

  if (buffer === null) return;

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(localGain);

  // Adjust playback rate based on accent (optional - makes different accents sound different)
  if (accent === 3)
    source.playbackRate.value = 1.0; // Normal pitch
  else if (accent === 2)
    source.playbackRate.value = 0.9; // Slightly lower
  else if (accent === 1) source.playbackRate.value = 0.8; // Lower

  localGain.gain.setValueAtTime(localVolume * (accent / 3), time); // Scale volume by accent

  if (clicktrack.data.fadeOutSound) {
    localGain.gain.exponentialRampToValueAtTime(
      0.00001,
      time + Math.min(buffer.duration, 0.3),
    );
  }

  source.start(time);
  // Let the sample play its natural duration or cut it short
  source.stop(time + Math.min(buffer.duration, clicktrack.data.noteDuration));
};

import { Clicktrack } from '../../models/Clicktrack';
import { Metronome } from '../../models/Metronome';

export const playClick = (
  audioContext: AudioContext | null,
  clicktrack: Clicktrack,
  beat: number,
  section: Metronome,
  time: number,
  callback: () => void
) => {
  const metronomeSoundLength = 0.3;

  if (audioContext === null) return;

  const oscillator = audioContext.createOscillator();
  const masterGain = audioContext.createGain();
  const localGain = audioContext.createGain();

  const masterVolume = clicktrack.data.muted ? 0 : clicktrack.data.volume / 100;
  const localVolume = section.muted ? 0 : section.volume / 100;

  oscillator.frequency.value = 440.0;
  if (beat === 0) {
    oscillator.frequency.value = 880.0;
    callback();
  }

  masterGain.gain.value = masterVolume;

  masterGain.connect(audioContext.destination);
  localGain.connect(masterGain);
  oscillator.connect(localGain);

  // Give it a nicer sound by fading out.
  localGain.gain.setValueAtTime(localVolume, time);
  if (clicktrack.data.fadeOutSound) {
    localGain.gain.exponentialRampToValueAtTime(
      0.00001,
      time + metronomeSoundLength
    );
  }

  oscillator.start(time);
  oscillator.stop(time + metronomeSoundLength);
};

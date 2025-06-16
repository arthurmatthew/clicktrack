import { Clicktrack } from '../../models/Clicktrack';
import { Metronome } from '../../models/Metronome';
import { Transition } from '../../models/Transition';

export const playClick = (
  audioContext: AudioContext | null,
  clicktrack: Clicktrack,
  beat: number,
  section: Metronome | Transition,
  time: number,
  callback: () => void
) => {
  const metronomeSoundLength = 0.3;

  if (audioContext === null) return;
  if (
    section instanceof Transition &&
    (section.toMetronome === undefined || section.fromMetronome === undefined)
  )
    return;

  const oscillator = audioContext.createOscillator();
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

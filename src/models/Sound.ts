import { SOUND_DEFAULT_BUFFER, SOUND_DEFAULT_DESCRIPTION } from '../config.ts';
import { globalAudioContext, hwPreferredSampleRate } from './GlobalAudioContext.ts';

const filenameInPath: RegExp = /\/([^/.]+)(?:\.[^/.]+)?$/;

export type soundDescriptor = number

export class Sound {
  public description: string;
  public buffer: AudioBuffer;

  constructor(options?: Partial<Sound>) {
    this.description = options?.description ?? SOUND_DEFAULT_DESCRIPTION;
    this.buffer = options?.buffer ?? SOUND_DEFAULT_BUFFER;
  }

  static async createFromURL(url: URL | string, options?: Partial<Sound>) {
    const _url = new URL(url, location.href);
    // use filename as fallback description
    const subject = new Sound({ description: filenameInPath.exec(_url.pathname)?.[1], ...options });

    const res = await fetch(_url);
    const buffer = res.arrayBuffer();
    subject.buffer = await globalAudioContext.decodeAudioData(await buffer);

    return subject;
  }

  static async createFromOfflineAudioContext(ctx: OfflineAudioContext, options?: Partial<Sound>) {
    const subject = new Sound({ description: 'Unnamed Sound', ...options });
    subject.buffer = await ctx.startRendering();

    return subject;
  }

  static availableSounds = new Map<soundDescriptor, Sound>();
  static {
    // Setup Sounds

    // Oscillator
    const oscAudioContext: OfflineAudioContext = new OfflineAudioContext({
      numberOfChannels: 1,
      sampleRate: hwPreferredSampleRate,
      length: hwPreferredSampleRate
    });
    const oscGain = new GainNode(oscAudioContext, { gain: 0.4 });
    oscGain.gain.exponentialRampToValueAtTime(
      0.001,
      hwPreferredSampleRate
    ); // Decay Envelope
    oscGain.connect(oscAudioContext.destination);
    const osc = new OscillatorNode(oscAudioContext, {});
    osc.connect(oscGain);
    osc.start(0);

    // White noise
    const noiseAudioContext: OfflineAudioContext = new OfflineAudioContext({
      numberOfChannels: 1,
      sampleRate: hwPreferredSampleRate,
      length: hwPreferredSampleRate
    });
    const moiseGain = new GainNode(noiseAudioContext, { gain: 0.4 });
    moiseGain.gain.exponentialRampToValueAtTime(
      0.001,
      hwPreferredSampleRate
    ); // Decay Envelope
    moiseGain.connect(noiseAudioContext.destination);
    const noiseRawBuffer = new AudioBuffer({
      numberOfChannels: 1,
      sampleRate: hwPreferredSampleRate,
      length: hwPreferredSampleRate
    });
    const output = noiseRawBuffer.getChannelData(0);
    for (let i = 0; i < hwPreferredSampleRate; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    [
      this.createFromURL('/sounds/click.wav'),
      this.createFromOfflineAudioContext(oscAudioContext, { description: 'Sine' }),
      this.createFromOfflineAudioContext(noiseAudioContext, { description: 'Noise' }),
      this.createFromURL('/sounds/big-hat.wav')
    ].map(async (prom, i): Promise<[number, Sound]> => {
      const sound = await prom;
      this.availableSounds.set(10 * i, sound);
      return [10 * i, sound];
    }).map(async (prom) => {
      const [base_sound_descriptor, base_sound] = await prom;
      const pitchAudioContext = new OfflineAudioContext({
        numberOfChannels: 1,
        sampleRate: hwPreferredSampleRate,
        length: hwPreferredSampleRate
      });
      const source = new AudioBufferSourceNode(pitchAudioContext, {
        buffer: base_sound.buffer,
        detune: 1200 // Pitch-shift by 1 octave (1200 cents)
      });
      source.connect(pitchAudioContext.destination);
      source.start(0);
      const sound = await this.createFromOfflineAudioContext(pitchAudioContext, { description: 'Accented ' + base_sound.description });
      this.availableSounds.set(base_sound_descriptor + 1, sound);
    }).forEach(promise => void promise.catch(error => {
      console.error(error);
    }));
  }
}

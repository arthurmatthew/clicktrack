import { SOUND_DEFAULT_ACCENT_DETUNE, SOUND_DEFAULT_BUFFER, SOUND_DEFAULT_DESCRIPTION } from '../config.ts';
import { globalAudioContext, hwPreferredSampleRate } from './GlobalAudioContext.ts';

const filenameInPath: RegExp = /\/([^/.]+)(?:\.[^/.]+)?$/;

export type soundDescriptor = number

export class Sound {
  public description: string;
  public buffer: AudioBuffer;
  public accentDetune: number; // in cents

  constructor(options?: Partial<Sound>) {
    this.description = options?.description ?? SOUND_DEFAULT_DESCRIPTION;
    this.buffer = options?.buffer ?? SOUND_DEFAULT_BUFFER;
    this.accentDetune = options?.accentDetune ?? SOUND_DEFAULT_ACCENT_DETUNE
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
      0.5
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
    const noiseGain = new GainNode(noiseAudioContext, { gain: 0.4 });
    noiseGain.gain.exponentialRampToValueAtTime(
      0.001,
      0.5
    ); // Decay Envelope
    noiseGain.connect(noiseAudioContext.destination);
    const noiseRawBuffer = new AudioBuffer({
      numberOfChannels: 1,
      sampleRate: hwPreferredSampleRate,
      length: hwPreferredSampleRate
    });
    const output = noiseRawBuffer.getChannelData(0);
    for (let i = 0; i < hwPreferredSampleRate; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noiseBufferSource = new AudioBufferSourceNode(noiseAudioContext, {buffer: noiseRawBuffer})
    noiseBufferSource.connect(noiseGain);
    noiseBufferSource.start(0);

    // Create sounds
    // eslint-disable-next-line no-extra-semi
    ;[
      this.createFromURL('/sounds/click.wav'),
      this.createFromOfflineAudioContext(oscAudioContext, { description: 'Sine', accentDetune: 1200 }),
      this.createFromOfflineAudioContext(noiseAudioContext, { description: 'Noise' }),
      this.createFromURL('/sounds/big-hat.wav')
    ].map(async (prom, i): Promise<[number, Sound]> => {
      // register then
      const sound = await prom;
      this.availableSounds.set(10 * i, sound);
      return [10 * i, sound];

    }).map(async (prom) => {
      // create pitch-shifted variations
      const [base_sound_descriptor, base_sound] = await prom;
      const pitchAudioContext = new OfflineAudioContext({
        numberOfChannels: 1,
        sampleRate: hwPreferredSampleRate,
        length: hwPreferredSampleRate
      });
      const source = new AudioBufferSourceNode(pitchAudioContext, {
        buffer: base_sound.buffer,
        detune: base_sound.accentDetune
      });
      source.connect(pitchAudioContext.destination);
      source.start(0);

      // register them
      const sound = await this.createFromOfflineAudioContext(pitchAudioContext, { description: 'Accented ' + base_sound.description });
      this.availableSounds.set(base_sound_descriptor + 1, sound);

    }).forEach(promise => void promise.catch(error => {
      // finally Log any Error
      console.error(error);
    }));
  }
}

export class Data {
  note: [note: string, octave: number];
  constructor(options: Partial<Data>) {
    this.note = options.note || ['C', 5];
  }
  get frequency() {
    /**
     * Calculates frequency of note considering the octave
     * @param zeroFreq Frequency of the 'zero note', for example C0 is 16.35 HZ
     * @param octave The octave of the note, entering 4 will give you C4's freq
     * @returns Frequency of note considering the octave
     */
    const calcOct = (zeroFreq: number, octave: number) => {
      if (octave === 0) return zeroFreq;
      return zeroFreq * Math.pow(2, octave);
    };
    const note = this.note[0].toUpperCase();
    const octave = this.note[1];
    switch (note) {
      case 'C':
        return calcOct(16.35, octave);
      case 'D':
        return calcOct(18.35, octave);
      case 'E':
        return calcOct(20.6, octave);
      case 'F':
        return calcOct(21.83, octave);
      case 'G':
        return calcOct(24.5, octave);
      case 'A':
        return calcOct(27.5, octave);
      case 'B':
        return calcOct(30.87, octave);
      default:
        console.error(`This note doesn't exist! (${NodeIterator})`);
        return 440;
    }
  }
}

export default interface Metronome {
  name: string;
  id: string;
  position: number;
  permanant: boolean;
  data: Data;
  opened?: boolean;
}

import Metronome from '../../../metronome/classes/clicktrack';

const getFrequency = (notes: Metronome['data']['note']) => {
  const calcOct = (zeroFreq: number, octave: number) => {
    if (octave === 0) return zeroFreq;
    return zeroFreq * Math.pow(2, octave);
  };
  const note = notes[0].toUpperCase();
  const octave = notes[1];
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
      console.error(`This note doesn't exist! (${note})`);
      return 440;
  }
};

export default getFrequency;

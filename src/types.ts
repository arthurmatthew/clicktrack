export type TTimeSignature = [beats: number, value: number];
export type TNote = [note: string, octave: number];
export type TSaveableData =
  | string
  | number
  | object
  | boolean
  | undefined
  | null;

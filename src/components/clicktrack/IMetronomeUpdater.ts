import { Metronome } from '../../models/Metronome';

export interface IMetronomeUpdater {
  metronome: Metronome;
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void;
}

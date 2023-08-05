import { Metronome } from '../../models/clicktrack/Metronome';

export interface IMetronomeUpdater {
  metronome: Metronome;
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void;
}

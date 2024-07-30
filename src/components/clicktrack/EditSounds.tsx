import { IMetronomeUpdater } from './IMetronomeUpdater';
import { Sound } from '../../models/Sound.ts';

export const EditSounds = ({
                             metronome,
                             updateMetronome
                           }: IMetronomeUpdater) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-sm opacity-50">Accents</h2>
      <select
        className={`rounded-sm bg-neutral-200 p-2 flex-grow dark:bg-neutral-900`}
        value={metronome.sounds[1]}
        onChange={(event) => {
          updateMetronome(metronome, { sounds: [+event.target.value + 1, +event.target.value] });
        }}
      >
        {[...Sound.availableSounds.entries()]
          .filter(([key]) => !(key % 10))
          .map(([key, sound]) =>
            <option key={key} value={key}>{sound.description}</option>
          )}
      </select>
    </div>
  );
};

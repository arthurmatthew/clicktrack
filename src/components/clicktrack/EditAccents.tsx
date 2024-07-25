import { IMetronomeUpdater } from './IMetronomeUpdater';

export const EditAccents = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-sm opacity-50">Accents</h2>
      <div className="flex gap-1">
          <button
            className={`rounded-sm bg-neutral-200 px-10 py-2 dark:bg-neutral-900 ${metronome.accents[0] ? "text-purple-500" : ''}`}
            onClick={() => {
              updateMetronome(metronome, { accents: [!metronome.accents[0], metronome.accents[1]] });
            }}
          >
            <i className="bi-square-half" />
          </button>
          <button
            className={`rounded-sm bg-neutral-200 px-10 py-2 dark:bg-neutral-900 rotate-180 ${metronome.accents[1] ? "text-purple-500" : ''}`}
            onClick={() => {
              updateMetronome(metronome, { accents: [metronome.accents[0], !metronome.accents[1]] });
            }}
          >
            <i className="bi-square-half" />
          </button>
      </div>
    </div>
  );
};

import { Metronome } from '../../models/Metronome';
import { TAccentLevels } from '../../types';
import { IMetronomeUpdater } from './IMetronomeUpdater';

export const EditAccentMap = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater) => {
  return (
    <div className="flex justify-evenly gap-1">
      {metronome.accentMap.map((accent, index) => {
        return (
          <EditAccent
            {...{ accent, index, metronome, updateMetronome }}
            key={index}
          />
        );
      })}
    </div>
  );
};

const EditAccent = ({
  accent,
  index,
  metronome,
  updateMetronome,
}: {
  accent: number;
  index: number;
  metronome: Metronome;
  updateMetronome: (metronome: Metronome, update: Partial<Metronome>) => void;
}) => {
  const label =
    index >= metronome.timeSignature[0] * 4
      ? ''
      : index % 4 === 0
      ? Math.floor(index / 4) + 1
      : ['', 'e', '&', 'a'][index % 4];

  return (
    <div
      onClick={() => {
        const newAccent = (accent + 1) % 4; // cycle back after 3 to 0
        const updatedAccentMap = [...metronome.accentMap];
        updatedAccentMap[index] = newAccent as TAccentLevels; // ! find safer way later
        updateMetronome(metronome, { accentMap: updatedAccentMap });
      }}
      className="flex-grow cursor-pointer"
    >
      {accent === 0 ? (
        <div className="grid flex-grow grid-rows-3 gap-[1px] bg-zinc-800 p-[1px] opacity-30">
          <div className="h-6 bg-black"></div>
          <div className="h-6 bg-black"></div>
          <div className="h-6 bg-black"></div>
        </div>
      ) : (
        <div className="grid grid-rows-3 gap-[1px] bg-zinc-800 p-[1px]">
          <div
            className={`h-6 ${accent >= 3 ? 'bg-zinc-800' : 'bg-black'}`}
          ></div>
          <div
            className={`h-6 ${accent >= 2 ? 'bg-zinc-800' : 'bg-black'}`}
          ></div>
          <div
            className={`h-6 ${accent >= 1 ? 'bg-zinc-800' : 'bg-black'}`}
          ></div>
        </div>
      )}
      <p
        className={`text-center text-sm opacity-50 ${
          accent === 0 && 'invisible'
        }`}
      >
        {label}
      </p>
    </div>
  );
};

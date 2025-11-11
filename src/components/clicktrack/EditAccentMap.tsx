import { useState } from 'react';
import { Metronome } from '../../models/Metronome';
import { TAccentLevels } from '../../types';
import { IMetronomeUpdater } from './IMetronomeUpdater';

type Resolution = 4 | 8 | 16;

const isSubdivisionVisible = (
  index: number,
  resolution: Resolution
): boolean => {
  const sixteenthsPerResolutionNote = 16 / resolution;

  return index % sixteenthsPerResolutionNote === 0;
};

const getSubdivisionLabel = (
  index: number,
  beatsPerBar: number,
  beatValue: number
): string => {
  const subdivisionsPerBeat = 16 / beatValue;
  const totalVisibleSubdivisions = beatsPerBar * subdivisionsPerBeat;

  if (index >= totalVisibleSubdivisions) return '';

  const beatNumber = Math.floor(index / subdivisionsPerBeat) + 1;
  const positionInBeat = index % subdivisionsPerBeat;

  if (positionInBeat === 0) return beatNumber.toString();

  if (beatValue === 8) {
    return ['', '+'][positionInBeat] || '';
  }

  if (beatValue === 4) {
    return ['', 'e', '&', 'a'][positionInBeat] || '';
  }

  if (beatValue === 2) {
    return ['', 'e', '&', 'a', '2', '2e', '2&', '2a'][positionInBeat] || '';
  }

  if (beatValue === 16) {
    return '';
  }
  return '';
};

export const EditAccentMap = ({
  metronome,
  updateMetronome,
}: IMetronomeUpdater & { resolution?: Resolution }) => {
  const [resolution, setResolution] = useState<Resolution>(4);

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-sm opacity-50">Accent Editor</h2>
      <div className="grid grid-cols-3">
        <button
          onClick={() => setResolution(4)}
          className={`${
            resolution === 4
              ? 'bg-zinc-300 font-semibold dark:bg-zinc-800'
              : 'bg-zinc-200 dark:bg-zinc-900'
          } py-2`}
        >
          Quarters
        </button>
        <button
          onClick={() => setResolution(8)}
          className={`${
            resolution === 8
              ? 'bg-zinc-300 font-semibold dark:bg-zinc-800'
              : 'bg-zinc-200 dark:bg-zinc-900'
          } py-2`}
        >
          Eighths
        </button>
        <button
          onClick={() => setResolution(16)}
          className={`${
            resolution === 16
              ? 'bg-zinc-300 font-semibold dark:bg-zinc-800'
              : 'bg-zinc-200 dark:bg-zinc-900'
          } py-2`}
        >
          Sixteenths
        </button>
      </div>
      <div className="flex justify-evenly gap-1">
        {metronome.accentMap.map((accent, index) => {
          if (!isSubdivisionVisible(index, resolution)) return null;
          return (
            <EditAccent
              {...{ accent, index, metronome, updateMetronome }}
              key={index}
            />
          );
        })}
      </div>
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
  const label = getSubdivisionLabel(
    index,
    metronome.timeSignature[0],
    metronome.timeSignature[1]
  );

  return (
    <div
      onClick={() => {
        const newAccent = (accent + 1) % 4; // cycle back after 3 to 0
        const updatedAccentMap = [...metronome.accentMap];
        updatedAccentMap[index] = newAccent as TAccentLevels; // ! find safer way later
        updateMetronome(metronome, { accentMap: updatedAccentMap });
      }}
      className="grow cursor-pointer"
    >
      {accent === 0 ? (
        <div className="grid grow grid-rows-3 gap-px bg-zinc-300 p-px opacity-30 dark:bg-zinc-800">
          <div className="h-6 bg-white dark:bg-black"></div>
          <div className="h-6 bg-white dark:bg-black"></div>
          <div className="h-6 bg-white dark:bg-black"></div>
        </div>
      ) : (
        <div className="grid grid-rows-3 gap-px bg-zinc-300 p-px dark:bg-zinc-800">
          <div
            className={`h-6 ${
              accent >= 3
                ? 'bg-zinc-300 dark:bg-zinc-800'
                : 'bg-white dark:bg-black'
            }`}
          ></div>
          <div
            className={`h-6 ${
              accent >= 2
                ? 'bg-zinc-300 dark:bg-zinc-800'
                : 'bg-white dark:bg-black'
            }`}
          ></div>
          <div
            className={`h-6 ${
              accent >= 1
                ? 'bg-zinc-300 dark:bg-zinc-800'
                : 'bg-white dark:bg-black'
            }`}
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

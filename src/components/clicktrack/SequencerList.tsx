import React from 'react';
import { TSection } from '../../types';
import { Metronome } from '../../models/Metronome';
import { Repeat } from '../../models/Repeat';

const SequencerList = ({
  children,
  section,
  setSelectedId,
  selected,
  copySection,
  deleteSection,
}: {
  section: TSection;
  selected: boolean;
  setSelectedId: (id: string) => void;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="group flex cursor-pointer items-center gap-2"
      onClick={() => {
        setSelectedId(section.id);
      }}
    >
      <div className="relative flex w-full items-center justify-between px-4 duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-800">
        <div className="flex gap-3 py-3 text-2xl">{children}</div>
        <div className="hidden h-fit gap-2 group-hover:flex">
          <button
            className={`group/button z-10 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-dashed border-zinc-900 border-opacity-20 hover:border-opacity-100 dark:border-zinc-300`}
            onClick={() => copySection(section.id)}
          >
            <i className="bi-copy text-zinc-900 opacity-20 group-hover/button:opacity-100 dark:text-zinc-300" />
          </button>
          <button
            className={`group/button z-10 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-dashed border-zinc-900 border-opacity-20 hover:border-opacity-100 dark:border-zinc-300`}
            onClick={() => deleteSection(section.id)}
          >
            <i className="bi-trash text-zinc-900 opacity-20 group-hover/button:opacity-100 dark:text-zinc-300" />
          </button>
        </div>

        <div
          className={`absolute left-0 top-0 h-full w-full bg-zinc-100 duration-75 dark:bg-zinc-800 ${
            !selected && 'hidden'
          }`}
        />
      </div>
    </div>
  );
};

export const SequencerListMetronome = ({
  metronome,
  setSelectedId,
  selected,
  copySection,
  deleteSection,
}: {
  metronome: Metronome;
  selected: boolean;
  setSelectedId: (id: string) => void;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
}) => {
  return (
    <SequencerList
      section={metronome}
      {...{ setSelectedId, copySection, deleteSection, selected }}
    >
      <i
        className={`bi-music-note-beamed z-10 ${
          selected && 'text-purple-500'
        } duration-150`}
      />{' '}
      <p className="relative z-10 flex items-center gap-2">
        <span className="font-semibold">{metronome.lengthInBars}</span> bars of{' '}
        <div
          className={`lora flex flex-col items-center px-1 text-sm font-black`}
        >
          <span className="leading-none">{metronome.timeSignature[0]}</span>
          <span className="leading-none">{metronome.timeSignature[1]}</span>
        </div>{' '}
        at <span className="font-semibold">{metronome.bpm}</span> BPM
      </p>
    </SequencerList>
  );
};

export const SequencerListRepeat = ({
  repeat,
  setSelectedId,
  selected,
  copySection,
  deleteSection,
}: {
  repeat: Repeat;
  selected: boolean;
  setSelectedId: (id: string) => void;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
}) => {
  return (
    <SequencerList
      section={repeat}
      {...{ setSelectedId, copySection, deleteSection, selected }}
    >
      <i
        className={`bi-repeat z-10 ${
          selected && 'text-purple-500'
        } duration-150`}
      />
      <p className="relative z-10">
        Repeat{' '}
        {repeat.infinite
          ? 'forever'
          : `${repeat.times} time${repeat.times > 1 ? 's' : ''}`}
      </p>
    </SequencerList>
  );
};

import { Transition } from '../../models/Transition';

export const SequencerListTransition = ({
  transition,
  setSelectedId,
  selected,
  copySection,
  deleteSection,
}: {
  transition: Transition;
  selected: boolean;
  setSelectedId: (id: string) => void;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
}) => {
  return (
    <SequencerList
      section={transition}
      {...{ setSelectedId, copySection, deleteSection, selected }}
    >
      {' '}
      <i
        className={`bi-speedometer z-10 ${
          selected && 'text-purple-500'
        } duration-150`}
      />{' '}
      <p className="relative z-10">
        Transition for {transition.lengthInBars} bars
      </p>
    </SequencerList>
  );
};

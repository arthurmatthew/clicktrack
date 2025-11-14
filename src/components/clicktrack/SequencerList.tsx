import React from 'react';
import { TSection } from '../../types';
import { Metronome } from '../../models/Metronome';
import { Repeat } from '../../models/Repeat';

const SequencerList = ({
  children,
  disableControls,
  section,
  hidden,
  setSelectedId,
  selected,
  copySection,
  deleteSection,
}: {
  disableControls: boolean;
  section: TSection;
  selected: boolean;
  hidden: boolean;
  setSelectedId: (id: string) => void;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
  children: React.ReactNode;
}) => {
  const { isMobile } = useIsMobile();

  return (
    <div
      className={`group flex cursor-pointer items-center gap-2`}
      onClick={() => {
        setSelectedId(section.id);
      }}
    >
      <div className="relative flex w-full items-center justify-between px-4 duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-800">
        <div
          className={`flex gap-3 py-3 text-xl md:text-2xl ${hidden && 'opacity-50'}`}
        >
          {children}
        </div>
        <div
          className={`h-fit gap-2 ${!disableControls && 'group-hover:flex'} ${isMobile && selected ? 'flex' : 'hidden'}`}
        >
          <button
            className={`group/button z-10 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-dashed border-zinc-900 hover:bg-zinc-500/50 dark:border-zinc-300`}
            onClick={() => copySection(section.id)}
            disabled={disableControls}
          >
            <i className="bi-copy text-zinc-900 group-hover/button:opacity-100 dark:text-zinc-300" />
          </button>
          <button
            className={`group/button z-10 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-dashed border-zinc-900 hover:bg-zinc-500/50 dark:border-zinc-300`}
            onClick={() => deleteSection(section.id)}
            disabled={disableControls}
          >
            <i className="bi-trash text-zinc-900 group-hover/button:opacity-100 dark:text-zinc-300" />
          </button>
        </div>

        <div
          className={`absolute top-0 left-0 h-full w-full bg-zinc-100 duration-75 dark:bg-zinc-800 ${
            (!selected || hidden) && 'hidden'
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
  hidden,
  disableControls,
  copySection,
  deleteSection,
}: {
  disableControls: boolean;
  metronome: Metronome;
  selected: boolean;
  hidden: boolean;
  setSelectedId: (id: string) => void;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
}) => {
  return (
    <SequencerList
      section={metronome}
      {...{
        setSelectedId,
        copySection,
        deleteSection,
        hidden,
        selected,
        disableControls,
      }}
    >
      <i
        className={`bi-music-note-beamed z-10 ${
          selected && 'text-purple-500'
        } duration-150`}
      />{' '}
      <div className="relative z-10 flex items-center gap-2">
        <span className="font-semibold">{metronome.lengthInBars}</span> bars of{' '}
        <p
          className={`lora flex flex-col items-center px-1 text-sm font-black`}
        >
          <span className="leading-none">{metronome.timeSignature[0]}</span>
          <span className="leading-none">{metronome.timeSignature[1]}</span>
        </p>{' '}
        at <span className="font-semibold">{metronome.bpm}</span> BPM
      </div>
    </SequencerList>
  );
};

export const SequencerListRepeat = ({
  repeat,
  setSelectedId,
  selected,
  hidden,
  copySection,
  disableControls,
  deleteSection,
}: {
  repeat: Repeat;
  selected: boolean;
  setSelectedId: (id: string) => void;
  hidden: boolean;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
  disableControls: boolean;
}) => {
  return (
    <SequencerList
      section={repeat}
      {...{
        setSelectedId,
        copySection,
        hidden,
        deleteSection,
        selected,
        disableControls,
      }}
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
import { useIsMobile } from '../../hooks/useIsMobile';

export const SequencerListTransition = ({
  transition,
  setSelectedId,
  disableControls,
  selected,
  hidden,
  copySection,
  deleteSection,
}: {
  transition: Transition;
  disableControls: boolean;
  selected: boolean;
  hidden: boolean;
  setSelectedId: (id: string) => void;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
}) => {
  return (
    <SequencerList
      section={transition}
      {...{
        setSelectedId,
        copySection,
        deleteSection,
        hidden,
        selected,
        disableControls,
      }}
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

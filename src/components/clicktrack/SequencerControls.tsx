interface ISequencerControls {
  addMetronome: () => void;
  addRepeat: () => void;
  addTransition: () => void;
}

export const SequencerControls = ({
  addMetronome,
  addRepeat,
  addTransition,
}: ISequencerControls) => {
  return (
    <div className="m-4 flex items-center gap-3">
      <button
        onClick={addMetronome}
        className="h-full w-1/2 rounded-sm bg-zinc-300 p-4 py-3 dark:bg-zinc-900"
      >
        Add a Metronome
      </button>
      <button
        onClick={addRepeat}
        className="h-full w-1/2 rounded-sm bg-zinc-300 p-4 py-3 dark:bg-zinc-900"
      >
        Add a Repeat
      </button>
      <button
        onClick={addTransition}
        className="h-full w-1/2 rounded-sm bg-zinc-300 p-4 py-3 dark:bg-zinc-900"
      >
        Add a Transition
      </button>
    </div>
  );
};

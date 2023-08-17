interface ISequencerControls {
  addMetronome: () => void;
  addRepeat: () => void;
}

export const SequencerControls = ({
  addMetronome,
  addRepeat,
}: ISequencerControls) => {
  return (
    <div className="m-4 flex items-center gap-3">
      <button
        onClick={addMetronome}
        className="h-full w-1/2 rounded-sm bg-neutral-300 p-4 py-3 duration-100 ease-out hover:w-7/12 dark:bg-neutral-900"
      >
        Add a Metronome
      </button>
      <button
        onClick={addRepeat}
        className="h-full w-1/2 rounded-sm bg-neutral-300 p-4 py-3 duration-100 ease-out hover:w-7/12 dark:bg-neutral-900"
      >
        Add a Repeat
      </button>
    </div>
  );
};

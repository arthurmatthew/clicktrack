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
        className="w-1/2 rounded-sm border-[1px] border-neutral-300 p-4 py-3 duration-100 ease-out hover:w-7/12 dark:border-neutral-900"
      >
        Add a Metronome
      </button>
      <button
        onClick={addRepeat}
        className="w-1/2 rounded-sm border-[1px] border-neutral-300 p-4 py-3 duration-100 ease-out hover:w-7/12 dark:border-neutral-900"
      >
        Add a Repeat
      </button>
    </div>
  );
};

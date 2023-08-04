interface ISequencerControls {
  addMetronome: () => void;
  addRepeat: () => void;
}

export const SequencerControls = ({
  addMetronome,
  addRepeat,
}: ISequencerControls) => {
  return (
    <div className="m-3 grid grid-cols-2 items-center gap-3">
      <div
        onClick={addMetronome}
        className="w-full cursor-pointer rounded-sm border-[1px] border-neutral-300 p-4 py-3 dark:border-neutral-900"
      >
        Add a Section
      </div>
      <div
        onClick={addRepeat}
        className="w-full cursor-pointer rounded-sm border-[1px] border-neutral-300 p-4 py-3 dark:border-neutral-900"
      >
        Add a Repeat
      </div>
    </div>
  );
};

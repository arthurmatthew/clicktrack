interface ISequencerControls {
  addMetronome: () => void;
  addRepeat: () => void;
  addTransition: () => void;
}

const SequencerButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="h-full rounded-sm bg-zinc-300 p-2 py-5 md:p-4 md:py-3 md:text-base dark:bg-zinc-900"
    >
      {children}
    </button>
  );
};

export const SequencerControls = ({
  addMetronome,
  addRepeat,
  addTransition,
}: ISequencerControls) => {
  return (
    <div className="m-1 grid grid-cols-3 items-center gap-1 md:m-4 md:gap-3">
      <SequencerButton onClick={addMetronome}>Add Metronome</SequencerButton>
      <SequencerButton onClick={addRepeat}>Add Repeat</SequencerButton>
      <SequencerButton onClick={addTransition}>Add Transition</SequencerButton>
    </div>
  );
};

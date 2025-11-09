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
      className="h-full rounded-sm bg-zinc-300 p-4 py-3 dark:bg-zinc-900"
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
    <div className="m-4 grid grid-cols-3 items-center gap-1 md:gap-3">
      <SequencerButton onClick={addMetronome}>Add Metronome</SequencerButton>
      <SequencerButton onClick={addRepeat}>Add Repeat</SequencerButton>
      <SequencerButton onClick={addTransition}>Add Transition</SequencerButton>
    </div>
  );
};

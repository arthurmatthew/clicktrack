const TimeSignatureButton = ({
  time,
  selected,
  onClick,
}: {
  time: [beats: number, value: number];
  selected?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center"
    >
      <div
        className={`flex h-full w-full flex-col items-center justify-center rounded-md border-2 p-2 leading-none duration-75 hover:border-slate-700 ${
          selected
            ? 'border-slate-700 bg-slate-700 text-slate-100'
            : 'border-slate-300'
        }`}
      >
        <h1>{time[0]}</h1>
        <h1>{time[1]}</h1>
      </div>
    </button>
  );
};

export default TimeSignatureButton;

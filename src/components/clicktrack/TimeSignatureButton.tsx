interface ITimeSignatureButton {
  time: [beats: number, value: number];
  selected?: boolean;
  onClick: () => void;
}

export const TimeSignatureButton = ({
  time,
  selected,
  onClick,
}: ITimeSignatureButton) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center"
    >
      <div
        className={`flex h-full w-full flex-col items-center justify-center p-3 leading-[0.75] duration-75 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
          selected
            ? 'border-zinc-200 bg-zinc-200 dark:border-zinc-300 dark:bg-zinc-900'
            : 'border-zinc-200 bg-white dark:border-zinc-900 dark:bg-black'
        }`}
      >
        <h1>{time[0]}</h1>
        <h1>{time[1]}</h1>
      </div>
    </button>
  );
};

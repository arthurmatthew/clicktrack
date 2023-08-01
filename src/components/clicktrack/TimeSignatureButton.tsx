export const TimeSignatureButton = ({
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
        className={`flex h-full w-full flex-col items-center justify-center p-2 leading-none duration-75 hover:bg-neutral-200 dark:hover:bg-neutral-900 ${
          selected
            ? 'border-neutral-200 bg-neutral-200 dark:border-neutral-300 dark:bg-neutral-900'
            : 'border-neutral-200 bg-white dark:border-neutral-900 dark:bg-black'
        }`}
      >
        <h1>{time[0]}</h1>
        <h1>{time[1]}</h1>
      </div>
    </button>
  );
};

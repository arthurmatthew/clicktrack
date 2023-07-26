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
        className={`flex h-full w-full flex-col items-center justify-center rounded-md border-2 p-2 leading-none duration-75 hover:border-neutral-700 dark:hover:border-neutral-300 ${
          selected
            ? 'border-neutral-700 bg-neutral-700 text-white dark:border-neutral-300 dark:bg-neutral-300 dark:text-black'
            : 'border-neutral-300 dark:border-neutral-600 dark:text-white'
        }`}
      >
        <h1>{time[0]}</h1>
        <h1>{time[1]}</h1>
      </div>
    </button>
  );
};

export default TimeSignatureButton;

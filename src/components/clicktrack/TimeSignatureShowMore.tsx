interface ITimeSignatureShowMore {
  onClick: React.MouseEventHandler;
  showingMore: boolean;
}

export const TimeSignatureShowMore = ({
  onClick,
  showingMore,
}: ITimeSignatureShowMore) => {
  return (
    <button
      onClick={onClick}
      className="inter group relative flex flex-col items-center justify-center text-lg font-normal"
    >
      <h1 className="flex h-full w-full flex-col items-center justify-center border-zinc-200 bg-white p-2 py-5 leading-none duration-75 group-hover:text-purple-500 dark:border-zinc-900 dark:bg-black">
        Show {showingMore ? 'Less' : 'More'}
      </h1>
    </button>
  );
};

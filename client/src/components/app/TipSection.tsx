export const TipSection = ({
  children,
  remove,
}: {
  children: React.ReactNode;
  remove: () => void;
}) => {
  return (
    <div className="group relative flex w-full items-center justify-between overflow-hidden rounded-md border-2 border-solid border-slate-300 p-4 text-slate-900 hover:border-dashed dark:border-slate-700 dark:text-slate-200">
      <p className="flex items-center gap-4 text-xl">
        <i className="rounded-md bg-purple-300 px-2 py-1 text-lg not-italic text-black dark:bg-purple-900 dark:text-white">
          Tip
        </i>{' '}
        <span>{children}</span>
      </p>
      <div
        onClick={remove}
        className="absolute left-0 top-0 hidden h-full w-full items-center justify-center backdrop-blur-md group-hover:flex"
      >
        <h1 className="text-xl text-red-400">Close Tip</h1>
      </div>
    </div>
  );
};

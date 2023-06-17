export const TipSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full rounded-md border-2 border-slate-300 p-4 text-slate-900 dark:border-slate-700 dark:text-slate-200">
      <p className="flex items-center gap-4 text-xl">
        <i className="rounded-md bg-purple-300 px-2 py-1 text-lg not-italic text-black dark:bg-purple-900 dark:text-white">
          Tip
        </i>{' '}
        <span>{children}</span>
      </p>
    </div>
  );
};

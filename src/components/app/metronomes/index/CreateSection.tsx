export const CreateSection = ({
  children,
  icon,
  add,
}: {
  children: React.ReactNode;
  icon: string;
  add: () => void;
}): JSX.Element => {
  return (
    <div
      onClick={add}
      className="w-full rounded-md border-2 border-dashed border-slate-300 bg-slate-200/50 px-3 py-2 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800"
    >
      <div className="text-slate-900 dark:text-slate-100">
        <h1 className="flex items-center text-xl font-semibold">
          <i
            className={`bi-${icon} mr-3 text-2xl text-slate-600 dark:text-slate-400`}
          />
          {children}
        </h1>
      </div>
    </div>
  );
};

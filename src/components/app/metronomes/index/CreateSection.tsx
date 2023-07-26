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
      className="w-full rounded-md border-2 border-dashed border-neutral-200 bg-white/50 px-3 py-2 hover:bg-white dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-900"
    >
      <div className="text-black dark:text-white">
        <h1 className="flex items-center text-xl font-semibold">
          <i
            className={`bi-${icon} mr-3 text-2xl text-neutral-600 dark:text-neutral-400`}
          />
          {children}
        </h1>
      </div>
    </div>
  );
};

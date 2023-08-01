export const InteractableListItem = ({
  children,
  icon,
  interaction,
}: {
  children: React.ReactNode;
  icon: string;
  interaction: () => void;
}): JSX.Element => {
  return (
    <div
      onClick={interaction}
      className="w-full rounded-md border-2 border-dashed border-neutral-200 bg-white/50 px-3 py-2 hover:bg-white dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-900"
    >
      <h1 className="flex items-center text-xl font-semibold">
        <i
          className={`bi-${icon} mr-3 text-2xl text-neutral-600 dark:text-neutral-400`}
        />
        {children}
      </h1>
    </div>
  );
};

export const SettingsButton = ({
  onClick,
  children,
}: {
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="min-w-[5rem] flex-grow rounded-md border-[1px] border-neutral-300 bg-neutral-200 py-2 dark:border-neutral-700 dark:bg-neutral-900 sm:flex-grow-0"
    >
      {children}
    </button>
  );
};

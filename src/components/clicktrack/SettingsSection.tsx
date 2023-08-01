export const SettingsSection = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-semibold uppercase text-black/50 dark:text-white/50">
        {name}
      </h1>
      {children}
    </div>
  );
};

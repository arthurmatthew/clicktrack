const Panel = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`flex flex-col rounded-md border-2 border-slate-300 shadow-2xl shadow-slate-300 dark:border-slate-700 dark:shadow-slate-900 ${className}`}
    >
      <h1 className="w-full bg-slate-300 px-2 py-1 text-sm dark:bg-slate-700">
        {title}
      </h1>
      <div className="flex-grow p-2">{children}</div>
    </div>
  );
};

export default Panel;

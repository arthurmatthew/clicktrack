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
      className={`flex flex-col rounded-md border-2 border-slate-300 shadow-slate-300 dark:border-slate-700 dark:shadow-slate-900 md:shadow-2xl ${className}`}
    >
      <h1 className="hidden w-full bg-slate-300 px-2 py-1 text-sm dark:bg-slate-700 md:block">
        {title}
      </h1>
      <div className="flex-grow px-2 py-4">{children}</div>
    </div>
  );
};

export default Panel;

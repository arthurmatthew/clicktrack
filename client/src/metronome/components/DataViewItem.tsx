const DataViewItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <li className="px-2">
      {title}{' '}
      <span className="rounded-md bg-slate-300 px-1 dark:bg-slate-700">
        {children}
      </span>
    </li>
  );
};

export default DataViewItem;

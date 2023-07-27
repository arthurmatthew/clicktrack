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
      <span className="rounded-md bg-neutral-200 px-1 dark:bg-neutral-900">
        {children}
      </span>
    </li>
  );
};

export default DataViewItem;

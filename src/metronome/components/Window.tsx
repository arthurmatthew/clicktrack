import HighlightedLink from './HighlightedLink';

interface Tab {
  to?: string;
  title?: string;
}

const Window = ({
  tabs,
  children,
}: {
  tabs?: Tab[];
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col">
      <nav className="space-evenly flex w-full gap-1">
        {tabs ? (
          tabs.map((x) => {
            return (
              <HighlightedLink key={x.title} to={x.to}>
                {x.title || x.to}
              </HighlightedLink>
            );
          })
        ) : (
          <div className="invisible">
            <HighlightedLink to="">.</HighlightedLink>
          </div>
        )}
      </nav>
      <div className="border-t-4 border-slate-300 bg-slate-200 p-4 dark:border-slate-800 dark:bg-slate-700 lg:rounded-bl-md lg:rounded-br-md">
        {children}
      </div>
    </div>
  );
};

export default Window;

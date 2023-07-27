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
    <div className="flex flex-col rounded-md border-2 border-neutral-200 bg-white  dark:border-neutral-900 dark:bg-black">
      <nav className="space-evenly flex w-full gap-5 bg-neutral-200 px-3 dark:bg-neutral-900">
        {tabs ? (
          tabs.map((tab) => {
            return (
              <HighlightedLink key={tab.title} to={tab.to}>
                {tab.title || tab.to}
              </HighlightedLink>
            );
          })
        ) : (
          <div className="invisible">
            <HighlightedLink to="">.</HighlightedLink>
          </div>
        )}
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Window;

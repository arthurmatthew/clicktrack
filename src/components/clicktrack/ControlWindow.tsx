import { IComponent } from '../IComponent';
import { HighlightedLink } from './HighlightedLink';

interface IControlWindow extends IComponent {
  tabs?: ITab[];
  children?: React.ReactNode;
}

interface ITab {
  to?: string;
  title?: string;
}

export const ControlWindow = ({ tabs, children }: IControlWindow) => {
  return (
    <div className="flex flex-col rounded-md border-[1px] border-zinc-200 bg-white  dark:border-zinc-900 dark:bg-black">
      <nav className="space-evenly flex w-full gap-5 bg-zinc-200 px-3 dark:bg-zinc-900">
        {tabs ? (
          tabs.map((tab) => {
            return (
              <HighlightedLink key={tab.title} to={tab.to}>
                {tab.title ?? tab.to}
              </HighlightedLink>
            );
          })
        ) : (
          <div className="invisible">
            <HighlightedLink to="">.</HighlightedLink>
          </div>
        )}
      </nav>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

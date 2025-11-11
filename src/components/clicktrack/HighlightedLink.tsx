import { IComponent } from '../IComponent';

interface IHighlightedLink extends IComponent {
  to?: string;
}

// ! no longer works without react router, basically pointless 
export const HighlightedLink = ({ to, children }: IHighlightedLink) => {
  return to ? (
    <a
      href={to}
      className={`block font-semibold lowercase   ${
        !location.pathname.endsWith(to) && 'font-normal opacity-70'
      }  py-2`}
    >
      {children ?? to}
    </a>
  ) : (
    <h1
      className="block flex-grow py-2 font-semibold lowercase
    lg:flex-grow-0"
    >
      {children ?? to}
    </h1>
  );
};

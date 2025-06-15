import { Link, useLocation } from 'react-router';
import { IComponent } from '../IComponent';

interface IHighlightedLink extends IComponent {
  to?: string;
}

export const HighlightedLink = ({ to, children }: IHighlightedLink) => {
  const location = useLocation();

  return to ? (
    <Link
      to={to}
      className={`block font-semibold lowercase   ${
        !location.pathname.endsWith(to) && 'font-normal opacity-70'
      }  py-2`}
    >
      {children ?? to}
    </Link>
  ) : (
    <h1
      className="block flex-grow py-2 font-semibold lowercase
    lg:flex-grow-0"
    >
      {children ?? to}
    </h1>
  );
};

import { Link, useLocation } from 'react-router-dom';

export const HighlightedLink = ({
  to,
  children,
}: {
  to?: string;
  children?: React.ReactNode;
}) => {
  const location = useLocation();

  return to ? (
    <Link
      to={to}
      className={`block font-semibold   ${
        !location.pathname.endsWith(to) && 'font-normal opacity-70'
      }  py-2`}
    >
      {children || to}
    </Link>
  ) : (
    <h1
      className="block flex-grow py-2 font-semibold
    lg:flex-grow-0"
    >
      {children || to}
    </h1>
  );
};

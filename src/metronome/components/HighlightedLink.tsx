import { Link, useLocation } from 'react-router-dom';

const HighlightedLink = ({
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
      className={`block flex-grow lg:flex-grow-0 ${
        location.pathname.endsWith(to)
          ? 'bg-gradient-to-b from-slate-400 to-slate-300 dark:from-slate-700 dark:to-slate-800'
          : 'bg-slate-300 dark:bg-slate-800'
      }  p-2 px-4 font-semibold`}
    >
      {children || to}
    </Link>
  ) : (
    <h1
      className="block flex-grow bg-slate-300 p-2
  px-4  font-semibold dark:bg-slate-800 lg:flex-grow-0"
    >
      {children || to}
    </h1>
  );
};

export default HighlightedLink;

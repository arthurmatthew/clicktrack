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
          ? 'bg-slate-700 text-slate-200 dark:bg-slate-300 dark:text-slate-950'
          : 'bg-slate-300 dark:bg-slate-800'
      }  p-2 px-4 font-semibold`}
    >
      {children || to}
    </Link>
  ) : (
    <h1
      className="block flex-grow bg-slate-700 p-2 px-4 font-semibold
  text-slate-200 dark:bg-slate-300  dark:text-slate-950 lg:flex-grow-0"
    >
      {children || to}
    </h1>
  );
};

export default HighlightedLink;

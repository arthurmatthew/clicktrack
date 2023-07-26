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
      className={`block font-semibold text-black dark:text-white ${
        !location.pathname.endsWith(to) && 'font-normal opacity-70'
      }  py-2`}
    >
      {children || to}
    </Link>
  ) : (
    <h1
      className="block flex-grow py-2 font-semibold
  text-black dark:text-white lg:flex-grow-0"
    >
      {children || to}
    </h1>
  );
};

export default HighlightedLink;

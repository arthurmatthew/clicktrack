import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="flex flex-grow flex-col items-center justify-center gap-5 px-2">
      <h1 className="text-center text-4xl font-black text-purple-700 dark:text-purple-200 sm:text-5xl">
        Oops... this page doesn't exist.
      </h1>
      <Link
        to="/"
        className="text-center text-xl text-purple-800 dark:text-purple-100"
      >
        Go home
      </Link>{' '}
    </section>
  );
};

export default NotFound;
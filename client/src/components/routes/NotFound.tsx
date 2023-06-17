import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-5 px-2">
      <h1 className="text-center text-5xl font-black text-purple-200 sm:text-7xl">
        Oops... this page doesn't exist.
      </h1>
      <p className="text-center text-4xl text-purple-100">
        <Link to="/" className="text-purple-300">
          Go home
        </Link>{' '}
        and get back on time.
      </p>
      <i className="bi-bug py-20 text-9xl text-purple-300"></i>
    </section>
  );
};

export default NotFound;

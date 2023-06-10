const NotFound = () => {
  return (
    <section className="mt-20 flex h-screen flex-col items-center gap-5 px-2">
      <h1 className="text-center text-5xl font-black text-purple-200 sm:text-7xl">
        Oops... this page doesn't exist.
      </h1>
      <p className="text-center text-4xl text-purple-100">
        <a href="/" className="text-purple-300">
          Go home
        </a>{' '}
        and get back on time.
      </p>
      <i className="bi-bug py-20 text-9xl text-purple-300"></i>
    </section>
  );
};

export default NotFound;

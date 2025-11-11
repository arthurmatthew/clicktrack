import { usePageTitle } from "../../hooks/usePageTitle";

export const Page = () => {
  usePageTitle('Error');

  return (
    <section className="flex flex-grow flex-col items-center justify-center gap-5 px-2">
      <h1 className="text-center text-4xl font-semibold sm:text-5xl">
        Oops... this page doesn&apos;t exist.
      </h1>
      <a href="/" className="text-center text-xl underline">
        Go home
      </a>
    </section>
  );
};

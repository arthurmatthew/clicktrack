import { HeroTitle } from './HeroTitle';
import { HeroLinks } from './HeroLinks';

export const Hero = () => {
  return (
    <>
      <button
        onClick={() => {
          throw new Error('sentry test error');
        }}
        className="bg-red-800 text-6xl text-white"
      >
        BIG ERROR TEST BUTTON
      </button>
      <section className="flex justify-center bg-purple-100 px-6 py-20 dark:bg-zinc-950 lg:bg-white dark:lg:bg-zinc-900">
        <div className="flex w-full max-w-7xl justify-center lg:justify-between">
          <div className="flex flex-col gap-6">
            <HeroTitle />
            <HeroLinks />
          </div>
          <div className="hidden h-[500px] w-[400px] grid-cols-3 grid-rows-3 rounded-lg lg:grid">
            {[
              'file-music',
              'hourglass-split',
              'music-note-beamed',
              'music-note',
              'file-music-fill',
              'hourglass-bottom',
              'hourglass-top',
              'music-note-list',
              'file-earmark-music',
            ].map((label) => (
              <div className="flex items-center justify-center">
                <i
                  className={`bi-${label} text-9xl text-zinc-200 duration-100 hover:-translate-y-2 hover:text-violet-500 dark:text-zinc-800 dark:hover:text-violet-500`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-2 my-6 flex justify-center">
        <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-1 md:gap-0 lg:flex-row">
          <h3 className="opacity-70">
            Enjoyed by musicians & directors from top programs
          </h3>
          <ul className="flex flex-wrap items-center justify-center gap-1">
            <li className="rounded-md border-[1px] border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700">
              United States Navy Band
            </li>
            <li className="rounded-md border-[1px] border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700">
              WMEA Honor Group
            </li>
            <li className="rounded-md border-[1px] border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700">
              Seattle Public Schools District
            </li>
          </ul>
        </div>
      </section>
      <section className="mx-2 flex justify-center text-black">
        <div className="grid w-full max-w-7xl grid-cols-1 grid-rows-4 gap-1 md:grid-cols-12 md:grid-rows-2">
          <div className="rounded-md bg-purple-300 md:col-span-6">
            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-xl">
                <i className="bi-cloud-fill pr-3 text-purple-800" />
                Free Cloud Storage
              </h3>
              <h2 className="text-3xl font-semibold">
                Save your clicktracks to an optional account and access them
                wherever you'd like.
              </h2>
            </div>
          </div>
          <div className="rounded-md bg-fuchsia-300 md:col-span-6">
            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-xl">
                <i className="bi-bar-chart-fill pr-3 text-fuchsia-800" />
                Gradual Rhythm
              </h3>
              <h2 className="text-3xl font-semibold">
                Smoothly adjust between tempos and replicate musical movement
                using Clicktrack's transition features.
              </h2>
            </div>
          </div>
          <div className="rounded-md bg-purple-200 md:col-span-5">
            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-xl">
                <i className="bi-stopwatch-fill pr-3 text-purple-700" />
                Uninterrupted Timing
              </h3>
              <h2 className="text-3xl font-semibold">
                Clicktrack uses modern audio practices to ensure that timing
                isn't interrupted by device performance.
              </h2>
            </div>
          </div>
          <div className="rounded-md bg-pink-200 md:col-span-7">
            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-xl">
                <i className="bi-heart-fill pr-3 text-pink-700" />
                Carefully Crafted
              </h3>
              <h2 className="text-3xl font-semibold">
                This is a personal tool of mine which I use and care about, and
                I'd like to share it with other musicians.
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section className="my-10 flex justify-center">
        <div className="flex gap-2">
          <i className="bi-three-dots text-2xl opacity-20" />
        </div>
      </section>
      <section className="mx-6 flex justify-center">
        <div className="flex w-full max-w-7xl flex-col justify-between gap-6">
          <h1 className="text-4xl font-semibold">Feedback and Contribution</h1>
          <p className="text-2xl">
            I'd like this to be a tool which is as useful as possible for
            musicians to use. Please use the resources below as ways to leave
            feedback or suggestions. I'll always appreciatively welcome it!
          </p>
          <ul className="list-disc px-6 text-2xl text-purple-900 dark:text-purple-200">
            <li className="underline">
              <a
                href="https://github.com/arthurmatthew/clicktrack/issues"
                target="_blank"
              >
                GitHub Issues
              </a>
            </li>
            <li>
              <p className="opacity-50">
                email temporarily hidden until spam is fixed
              </p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

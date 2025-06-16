import { HeroTitle } from './HeroTitle';
import { HeroLinks } from './HeroLinks';

export const Hero = () => {
  return (
    <>
      <section className="mx-2 my-20 flex justify-center">
        <div className="flex w-full max-w-7xl justify-between">
          <div className="flex flex-col justify-center gap-6">
            <HeroTitle />
            <HeroLinks />
          </div>
          <div className="h-[500px] w-[400px] rounded-lg bg-zinc-200" />
        </div>
      </section>
      <section className="my-6 flex justify-center">
        <div className="flex w-full max-w-7xl items-center justify-between">
          <h3 className="opacity-70">
            Enjoyed by musicians & directors from top programs
          </h3>
          <ul className="flex items-center justify-between gap-1">
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
      <section className="flex justify-center text-black">
        <div className="grid w-full max-w-7xl grid-cols-4 grid-rows-3 gap-1">
          <div className="col-span-2 rounded-md bg-purple-300">
            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-xl">
                <i className="bi-cloud-fill pr-3 text-purple-800" />
                Free Cloud Storage
              </h3>
              <h2 className="text-4xl font-semibold">Access, anywhere.</h2>
            </div>
          </div>
          <div className="col-span-2 rounded-md bg-fuchsia-300">
            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-xl">
                <i className="bi-bar-chart-fill pr-3 text-fuchsia-800" />
                Gradual Rhythm
              </h3>
              <h2 className="text-4xl font-semibold">Speed up, slow down.</h2>
            </div>
            <div className="h-48 w-64"></div>
          </div>
          <div className="col-span-4 rounded-md bg-purple-200">
            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-xl">
                <i className="bi-stopwatch-fill pr-3 text-purple-700" />
                Uninterrupted Timing
              </h3>
              <h2 className="text-4xl font-semibold">Details matter.</h2>
            </div>
          </div>
          <div className="rounded-md bg-fuchsia-200">
            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-xl">Uninterrupted Timing</h3>
              <h2 className="text-4xl font-semibold">Details matter.</h2>
            </div>
          </div>
          <div className="col-span-3 rounded-md bg-violet-100">
            <div className="flex flex-col gap-2 p-6">
              <h3 className="text-xl">Uninterrupted Timing</h3>
              <h2 className="text-4xl font-semibold">Details matter.</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

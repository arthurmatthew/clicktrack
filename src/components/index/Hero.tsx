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
          <div className="h-[500px] w-[400px] rounded-lg bg-gray-200" />
        </div>
      </section>
      <section className="my-6 flex justify-center">
        <div className="flex w-full max-w-7xl items-center justify-between">
          <h3 className="opacity-70">
            Enjoyed by musicians & directors from top programs
          </h3>
          <ul className="flex items-center justify-between gap-1">
            <li className="rounded-md border-[1px] border-gray-300 px-4 py-2 text-sm">
              United States Navy Band
            </li>
            <li className="rounded-md border-[1px] border-gray-300 px-4 py-2 text-sm">
              WMEA Honor Group
            </li>
            <li className="rounded-md border-[1px] border-gray-300 px-4 py-2 text-sm">
              Seattle Public Schools District
            </li>
          </ul>
        </div>
      </section>
      <section className="flex h-[700px] justify-center">
        <div className="grid w-full max-w-7xl grid-cols-4 grid-rows-3 gap-2">
          <div className="col-span-2 bg-gray-200" />
          <div className="col-span-2 bg-gray-200" />
          <div className="col-span-4 bg-gray-200" />
          <div className="bg-gray-200" />
          <div className="col-span-3 bg-gray-200" />
        </div>
      </section>
    </>
  );
};

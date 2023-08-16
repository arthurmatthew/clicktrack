import { HeroTitle } from './HeroTitle';
import { HeroLinks } from './HeroLinks';

export const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center px-2">
      <div className="mx-auto my-20 flex max-w-5xl flex-col justify-center">
        <HeroTitle />
        <HeroLinks />
      </div>
    </section>
  );
};

import { InfoCard } from './InfoCard';

export const Features = () => {
  return (
    <section className="my-10 flex flex-col px-2 sm:my-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
        <InfoCard icon="stack" title="Free">
          Clicktrack has all the premium features from other metronomes for
          free.
        </InfoCard>
        <InfoCard icon="cloud-download-fill" title="No Strings Attatched">
          You don't need to make an account. Everything happens locally on your
          browser.
        </InfoCard>
        <InfoCard icon="github" title="Open Source">
          Clicktrack is open source which means users like you can help improve
          our project.{' '}
          <a
            target="_blank"
            className="underline"
            href="https://www.github.com/arthurmatthew/clicktrack"
          >
            Check it out
          </a>
        </InfoCard>
      </div>
    </section>
  );
};

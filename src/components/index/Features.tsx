import { InfoCard } from './InfoCard';

export const Features = () => {
  return (
    <section className="my-10 flex flex-col px-2 sm:my-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
        <InfoCard icon="stack" title="Portable">
          Clicktrack is designed to work on any modern device. It'll be amazing
          no matter what. Not on your device?{' '}
          <a
            href="https://github.com/arthurmatthew/clicktrack/issues/new"
            className="underline"
            target="_blank"
          >
            Request it
          </a>
        </InfoCard>
        <InfoCard icon="emoji-smile-fill" title="Easy">
          It's easy when you want it to be. We make it easy to ignore all the
          advanced features. You don't need to be a music nerd.
        </InfoCard>
        <InfoCard icon="cloud-download-fill" title="Saveable">
          You can save your metronomes to the cloud or your local storage.
        </InfoCard>
        <InfoCard icon="recycle" title="Dynamic">
          Our metronome will adapt to whatever tempo changes your music has.
        </InfoCard>
        <InfoCard icon="pin-angle-fill" title="Precise">
          You can trust our metronome to be within milliseconds of precision.
          Your ear may not hear the difference, but it matters in the long run.
        </InfoCard>
        <InfoCard icon="emoji-sunglasses-fill" title="Feature-packed">
          We have everything a metronome should have. And then some.{' '}
          <a className="underline">Learn more</a>
        </InfoCard>
      </div>
    </section>
  );
};

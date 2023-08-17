export const WhyUs = () => {
  return (
    <section className="grid gap-10 sm:grid-cols-2">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-semibold">
          So... <span className="text-purple-500">why us</span>?
        </h1>
        <p className="text-2xl">
          Clicktrack is community maintained and completely free. Most metronome
          apps on the internet are outdated. We don&apos;t hide our awesome
          features behind a paywall.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-semibold">I want a simple metronome...</h1>
        <p className="text-2xl">
          That&apos;s okay! We make it easy to hide things you don&apos;t want
          to see. Plus, clicktrack is{' '}
          <span className="text-purple-500">internally strong</span>. Even if
          you don&apos;t take advantage of our awesome features, you&apos;ll
          still benefit from our precise timing and rock solid foundation.
        </p>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <div className="mx-auto flex max-w-5xl flex-col justify-center pt-20">
          <h1 className="text-center text-7xl font-black text-purple-200">
            The only metronome you'll ever need.
          </h1>
          <p className="lora mx-2 mt-10 text-center text-lg text-purple-200">
            Seriously. <i className="inter not-italic">clicktrack</i> is a{' '}
            beautifully modern{' '}
            <i className="font-bold not-italic">dynamic metronome</i> which
            follows whatever musical arrangement you throw at it. Our user
            friendly interface allows you to build your own clicktrack and
            optimize your practice session.
          </p>
          <div className="mt-10 flex justify-center gap-2">
            <button className="drop rounded-md bg-purple-700 px-12 py-3 text-xl text-white shadow-2xl shadow-purple-500">
              Get started
            </button>
            <button className="drop rounded-md border-2 border-purple-300 px-12 py-3 text-xl text-purple-300">
              Learn More
            </button>
            p
          </div>
        </div>
      </section>
      <div className="h-screen"></div>
    </>
  );
};

export default Index;

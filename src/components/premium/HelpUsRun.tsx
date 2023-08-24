export const HelpUsRun = () => {
  return (
    <section className="my-20 flex flex-col items-center rounded-lg p-16">
      <h1 className="text-center text-6xl font-semibold">
        Help Fund Clicktrack
      </h1>
      <p className="lora my-10 max-w-md text-center text-xl italic">
        Clicktrack is run by a single aspiring developer & musician who wants to
        make cool projects. Clicktrack costs money to run. Premium users help
        fund upkeep and development costs.
      </p>
      <div className="relative my-10 flex items-center justify-center">
        <i className="bi-heart-fill absolute text-5xl text-pink-600" />
        <i className="bi-heart-fill absolute text-5xl text-pink-600 blur-lg" />
      </div>
    </section>
  );
};

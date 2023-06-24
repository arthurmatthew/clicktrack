const Footer = () => {
  return (
    <footer className="dark:to-slate-950 bg-gradient-radial flex flex-shrink basis-44 flex-col justify-center from-slate-100 to-slate-300 bg-[length:100%_200%] bg-[100%_100%] py-10 px-4 text-purple-100 dark:from-slate-800">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
        <FooterSection />
        <FooterSection />
        <FooterSection />
        <FooterSection />
      </div>
      <section className="mt-10 flex flex-col items-center text-xs text-black opacity-80 dark:text-white">
        <p className="text-center">
          Thank you for choosing clicktrack. This project was made by Matthew
          Arthur under the GPL-3.0 license.
        </p>
      </section>
    </footer>
  );
};

const FooterSection = () => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300">
        Placeholder
      </h3>
      <div className="my-5 h-px w-1/2 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"></div>
      <ul className="leading-loose text-slate-900 dark:text-slate-200">
        <li>Placeholder</li>
        <li>Placeholder</li>
        <li>Placeholder</li>
        <li>Placeholder</li>
      </ul>
    </div>
  );
};

export default Footer;
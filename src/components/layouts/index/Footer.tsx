const Footer = () => {
  return (
    <footer className="flex flex-shrink basis-44 flex-col justify-center bg-gradient-radial from-white to-neutral-300 bg-[length:100%_200%] bg-[100%_100%] px-4 py-10 text-purple-100 dark:from-neutral-800 dark:to-black">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
        <FooterSection title={'Contribute'}>
          <li>
            <a>Report a Bug</a>
          </li>
          <li>
            <a>Source Code</a>
          </li>
          <li>
            <a>Request a Feature</a>
          </li>
          <li>
            <a>Donate</a>
          </li>
        </FooterSection>
        <FooterSection title={'Social'}>
          <li>
            <a>Blog</a>
          </li>
          <li>
            <a>Twitter</a>
          </li>
          <li>
            <a>Instagram</a>
          </li>
          <li>
            <a>YouTube</a>
          </li>
        </FooterSection>
        <FooterSection title={'Contribute'} />
        <FooterSection title={'Contribute'} />
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

const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 text-black dark:text-white">
      <h3 className="font-semibold">{title}</h3>
      <ul className="text-center leading-loose underline">{children}</ul>
    </div>
  );
};

export default Footer;

const Footer = () => {
  return (
    <footer className="to-slate-950 bg-gradient-radial flex shrink grow-0 basis-44 flex-wrap justify-evenly from-slate-800 bg-[length:100%_200%] bg-[100%_100%] px-4 py-12 leading-loose text-purple-100 lg:px-64 xl:px-72 2xl:px-96 [&>*]:px-4">
      <div className="mt-2 flex flex-col gap-2">
        <h2 className="text-lg text-purple-300">clicktrack</h2>
        <ul className="underline">
          <li>Read the Docs</li>
          <li>Get Started</li>
          <li>First Project</li>
          <li>Exporting</li>
        </ul>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <h2 className="text-lg text-purple-300">Support</h2>
        <ul className="underline">
          <li>Bug Reports</li>
          <li>Feature Requests</li>
        </ul>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <h2 className="text-lg text-purple-300">Community</h2>
        <ul className="underline">
          <li>GitHub</li>
          <li>Twitter</li>
          <li>TikTok</li>
          <li>Patreon</li>
        </ul>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <h2 className="text-lg text-purple-300">Placeholder</h2>
        <ul className="underline">
          <li>Just</li>
          <li>A</li>
          <li>Simple</li>
          <li>Placeholder</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

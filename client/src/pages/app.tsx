import { useState } from 'react';

const App = () => {
  return (
    <div className="my-10 mx-4 flex flex-grow flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <div className="w-full rounded-md border-2 border-slate-700 p-4 text-slate-200">
          <p className="flex items-center gap-4 text-xl">
            <i className="rounded-md bg-purple-900 py-1 px-2 text-lg not-italic text-white">
              Tip
            </i>{' '}
            <span>
              <a
                target="_blank"
                href="https://mycomputerworks.com/how-to-bookmark-webpages-browser/"
                className="underline"
              >
                Bookmark this page
              </a>{' '}
              to have instant access to the metronome.
            </span>
          </p>
        </div>
        <MetronomeSection
          name="Basic Metronome"
          opened={true}
        ></MetronomeSection>
      </div>
    </div>
  );
};

interface IMetronomeSection {
  children?: React.ReactNode;
  name?: string;
  opened?: boolean;
}

const MetronomeSection = ({ children, name, opened }: IMetronomeSection) => {
  const [shown, setShown] = useState<boolean>(opened || false);

  return (
    <div className="w-full rounded-md border-2 border-slate-700 bg-slate-800 p-4">
      <div
        className="flex items-center justify-between text-slate-100"
        onClick={() => setShown((prev) => !prev)}
      >
        <h1 className="text-3xl font-semibold">{name || 'Unnamed Section'}</h1>
        <i
          className={`${
            shown ? 'bi-caret-down-fill' : 'bi-caret-right-fill'
          } text-2xl`}
        ></i>
      </div>

      {shown && children}
    </div>
  );
};

export default App;

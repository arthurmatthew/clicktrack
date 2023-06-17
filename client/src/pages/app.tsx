import { useState } from 'react';

interface Section {
  name: string;
  opened?: boolean;
}

const App = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      name: 'Basic Metronome',
      opened: true,
    },
  ]);

  const handleAdd = () => {
    setSections((prev) => [
      ...prev,
      { name: 'New Metronome ' + (prev.length + 1) },
    ]);
  };

  return (
    <div className="mx-4 my-10 flex flex-grow flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <TipSection>
          <a
            target="_blank"
            href="https://mycomputerworks.com/how-to-bookmark-webpages-browser/"
            className="underline"
          >
            Bookmark this page
          </a>{' '}
          to have instant access to the metronome.
        </TipSection>
        <CreateSection add={handleAdd} />
        {sections.map((x, i) => (
          <MetronomeSection key={i} name={x.name} opened={x.opened} />
        ))}
      </div>
    </div>
  );
};

interface IMetronomeSection {
  children?: React.ReactNode;
  name?: string;
  opened?: boolean;
}

const TipSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full rounded-md border-2 border-slate-300 p-4 text-slate-900 dark:border-slate-700 dark:text-slate-200">
      <p className="flex items-center gap-4 text-xl">
        <i className="rounded-md bg-purple-300 px-2 py-1 text-lg not-italic text-black dark:bg-purple-900 dark:text-white">
          Tip
        </i>{' '}
        <span>{children}</span>
      </p>
    </div>
  );
};

const CreateSection = ({ add }: { add: () => void }) => {
  return (
    <div
      onClick={add}
      className="w-full rounded-md border-2 border-dashed border-slate-300 bg-slate-200/50 p-4 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800"
    >
      <div className="flex items-center justify-between text-slate-900 dark:text-slate-100">
        <h1 className="text-3xl font-semibold">
          <i className="bi-plus-square mr-3 text-slate-600 dark:text-slate-400"></i>
          Create New
        </h1>
        <i className="text-2xl text-slate-600 dark:text-slate-400"></i>
      </div>
    </div>
  );
};

const MetronomeSection = ({ children, name, opened }: IMetronomeSection) => {
  const [shown, setShown] = useState<boolean>(opened || false);

  return (
    <div className="w-full rounded-md border-2 border-slate-300 bg-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800">
      <div
        className="flex items-center justify-between text-slate-900 dark:text-slate-100"
        onClick={() => setShown((prev) => !prev)}
      >
        <h1 className="text-3xl font-semibold">
          <i className="bi-list mr-3 text-slate-600 dark:text-slate-400"></i>
          {name || 'Unnamed Section'}
        </h1>
        <i
          className={`${
            shown ? 'bi-caret-down-fill' : 'bi-caret-right-fill'
          } text-2xl text-slate-600 dark:text-slate-400`}
        ></i>
      </div>

      {shown && children}
    </div>
  );
};

export default App;

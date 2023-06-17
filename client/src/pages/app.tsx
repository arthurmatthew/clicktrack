import { useState } from 'react';
import { TipSection } from '../components/app/TipSection';
import { CreateSection } from '../components/app/CreateSection';
import { MetronomeSection } from '../components/app/MetronomeSection';

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
    {
      name: 'Burger Metronome',
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
        <ul>
          {sections.map((x, i) => (
            <MetronomeSection key={i} name={x.name} opened={x.opened} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

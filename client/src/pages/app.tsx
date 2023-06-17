import { useState } from 'react';
import { TipSection } from '../components/app/TipSection';
import { CreateSection } from '../components/app/CreateSection';
import { MetronomeSection } from '../components/app/MetronomeSection';
import { Metronome } from '../components/app/Metronome';

interface Section {
  name: string;
  data: {
    bpm: number;
  };
  opened?: boolean;
}

const defaultMetronome = {
  name: 'Basic Metronome',
  opened: true,
  data: {
    bpm: 120,
  },
};

const App = () => {
  const [sections, setSections] = useState<Section[]>([defaultMetronome]);

  const handleAdd = () => {
    setSections((prev) => [
      ...prev,
      { ...defaultMetronome, name: 'New Metronome ' + (prev.length + 1) },
    ]);
  };

  const handleRemove = (name: string) => {
    setSections((prev) => prev.filter((metronome) => metronome.name != name));
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
        <ul className="flex flex-col gap-4">
          {sections.map((x, i) => (
            <MetronomeSection key={i} name={x.name} opened={x.opened}>
              <Metronome remove={() => handleRemove(x.name)} />
            </MetronomeSection>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

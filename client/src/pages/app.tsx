import { useState } from 'react';
import { TipSection } from '../components/app/TipSection';
import { CreateSection } from '../components/app/CreateSection';
import { MetronomeSection } from '../components/app/MetronomeSection';
import { Metronome } from '../components/app/Metronome';
import { motion } from 'framer-motion';
import useStickyState from '../hooks/useStickyState';

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

  const [tipShowing, setTipShowing] = useStickyState<boolean>(
    true,
    'show-bookmark-tip'
  );

  return (
    <div className="mx-4 my-10 flex flex-grow flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        {tipShowing && (
          <TipSection remove={() => setTipShowing(false)}>
            Bookmark this page to have instant access!
          </TipSection>
        )}
        <CreateSection add={handleAdd} />
        <ul className="flex flex-col gap-4">
          {sections.map((x, i) => (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              key={i}
            >
              <MetronomeSection name={x.name} opened={x.opened}>
                <Metronome remove={() => handleRemove(x.name)} />
              </MetronomeSection>
            </motion.div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

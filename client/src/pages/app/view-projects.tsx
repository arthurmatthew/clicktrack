import { useState } from 'react';
import { TipSection } from '../../components/app/TipSection';
import { CreateSection } from '../../components/app/CreateSection';
import { MetronomeSection } from '../../components/app/MetronomeSection';
import { motion } from 'framer-motion';
import useStickyState from '../../hooks/useStickyState';
import sortByPos from '../../helpers/sortByPos';

export interface Section {
  name: string;
  position: number;
  data: {
    bpm: number;
  };
  opened?: boolean;
}

const defaultMetronome: Section = {
  name: 'Basic Metronome',
  opened: false,
  position: 1,
  data: {
    bpm: 120,
  },
} as Section;

const ViewProjects = () => {
  const [sections, setSections] = useState<Section[]>([defaultMetronome]);

  const handleAdd = () => {
    setSections((prev) => [
      ...prev,
      {
        ...defaultMetronome,
        name: 'New Metronome ' + (prev.length + 1),
        position: prev.length + 1,
      },
    ]);
  };

  const handleRemove = (name: string) => {
    setSections((prev) => prev.filter((metronome) => metronome.name != name));
  };

  const handleNameChange = (name: string, newName: string) => {
    setSections((prev) => {
      let uniqueName = newName;
      let trials = 0;

      while (true) {
        console.log('Trial ' + trials);
        console.log('Testing for: ' + uniqueName);
        const exist = [
          ...prev.filter((metronome) => metronome.name != name),
          {
            ...prev.filter((metronome) => metronome.name == name)[0],
            name: uniqueName,
          },
        ].filter((metronome) => metronome.name == uniqueName).length;
        console.log('Exist already: ' + exist);
        if (exist <= 1) {
          uniqueName = trials == 0 ? newName : `${newName} (#${trials})`;
          console.log('Name availible: ' + uniqueName);
          break;
        }
        trials++;
        uniqueName = `${newName} (#${trials})`;
      }

      return [
        ...prev.filter((metronome) => metronome.name != name),
        {
          ...prev.filter((metronome) => metronome.name == name)[0],
          name: uniqueName,
        },
      ];
    });
  };

  const [tipShowing, setTipShowing] = useStickyState<boolean>(
    true,
    'show-bookmark-tip'
  );

  return (
    <div className="mx-4 my-10 flex flex-grow flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <h1 className="text-3xl text-slate-900 dark:text-slate-200">
          Your Metronomes
        </h1>
        {tipShowing && (
          <TipSection remove={() => setTipShowing(false)}>
            Bookmark this page to have instant access!
          </TipSection>
        )}
        <CreateSection add={handleAdd} />
        <ul className="flex flex-col gap-4">
          {sections.length == 0 ? (
            <h1 className="text-center text-slate-700 dark:text-slate-200">
              You don't have any metronomes right now. Make a new one by
              clicking the button above.
            </h1>
          ) : (
            sortByPos(sections).map((x, i) => (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                key={i}
              >
                <MetronomeSection
                  remove={() => handleRemove(x.name)}
                  changeName={handleNameChange}
                  name={x.name}
                  opened={x.opened}
                />
              </motion.div>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ViewProjects;

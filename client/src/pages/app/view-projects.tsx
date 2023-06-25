import { useState } from 'react';
import { TipSection } from '../../components/app/TipSection';
import { CreateSection } from '../../components/app/CreateSection';
import { MetronomeSection } from '../../components/app/MetronomeSection';
import { motion } from 'framer-motion';
import useStickyState from '../../hooks/useStickyState';
import sortByPos from '../../helpers/sortByPos';
import makeUnique from '../../helpers/makeUnique';

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
  const [sections, setSections] = useStickyState<Section[]>(
    [defaultMetronome],
    'metronomes'
  );

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
    setSections((prev) => [
      ...prev.filter((metronome) => metronome.name != name),
      {
        ...prev.filter((metronome) => metronome.name == name)[0],
        name: makeUnique(name, newName, prev),
      },
    ]);
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
        <div className="flex flex-col gap-2">
          <CreateSection icon="plus-square" add={handleAdd}>
            Create New
          </CreateSection>
          <CreateSection icon="file-earmark-plus" add={handleAdd}>
            Create New From Template
          </CreateSection>
          <CreateSection icon="download" add={handleAdd}>
            Import
          </CreateSection>
        </div>

        <ul className="flex flex-col gap-4">
          {sections.length == 0 ? (
            <h1 className="text-center text-slate-700 dark:text-slate-200">
              You don't have any metronomes right now.
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

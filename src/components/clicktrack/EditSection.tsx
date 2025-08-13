import { Metronome } from '../../models/Metronome';
import { Repeat } from '../../models/Repeat';
import { Section } from '../../models/Section';
import { Transition } from '../../models/Transition';
import { TSection } from '../../types';
import { EditMetronome } from './EditMetronome';
import { EditRepeat } from './EditRepeat';
import { EditTransition } from './EditTransition';
import { SectionControls } from './SectionControls';

export interface IEditSection {
  updateSection: <T extends TSection>(
    section: T,
    update: Partial<Omit<T, 'id' | 'type'>>
  ) => void;
  deleteSection: (id: string) => void;
  copySection: (id: string) => void;
  selected: Section | undefined;
}

export const EditSection = ({
  updateSection,
  deleteSection,
  copySection,
  selected,
}: IEditSection) => {
  const getProperSectionEditor = () => {
    if (selected instanceof Metronome)
      return (
        <EditMetronome updateMetronome={updateSection} metronome={selected} />
      );

    if (selected instanceof Repeat)
      return <EditRepeat updateRepeat={updateSection} repeat={selected} />;

    if (selected instanceof Transition)
      return (
        <EditTransition
          updateTransition={updateSection}
          transition={selected}
        />
      );
  };

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 p-4">
      <div className="grid items-center gap-2">{getProperSectionEditor()}</div>
      <div>
        {selected && (
          <SectionControls
            {...{ copySection, deleteSection }}
            id={selected.id}
          />
        )}
      </div>
    </div>
  );
};

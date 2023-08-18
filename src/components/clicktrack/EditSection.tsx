import { Metronome } from '../../models/Metronome';
import { Repeat } from '../../models/Repeat';
import { Section } from '../../models/Section';
import { EditMetronome } from './EditMetronome';
import { EditRepeat } from './EditRepeat';
import { SectionControls } from './SectionControls';

export interface IEditSection {
  updateSection: <T extends Metronome | Repeat>(
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
  };

  return (
    <div className="flex h-full flex-col justify-between gap-4 p-4">
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

import { Metronome } from '../../models/clicktrack/Metronome';
import { Repeat } from '../../models/clicktrack/Repeat';
import { Section } from '../../models/clicktrack/Section';
import { EditMetronome } from './EditMetronome';
import { EditRepeat } from './EditRepeat';
import { SectionControls } from './SectionControls';

interface IEditSection {
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
    <div className="flex flex-col gap-2 p-4">
      <div className="grid items-center gap-2">{getProperSectionEditor()}</div>
      {selected && (
        <SectionControls
          {...{ copySection, deleteSection }}
          id={selected?.id}
        />
      )}
    </div>
  );
};

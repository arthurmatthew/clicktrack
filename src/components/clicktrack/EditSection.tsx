import { Metronome } from '../../models/clicktrack/Metronome';
import { Repeat } from '../../models/clicktrack/Repeat';
import { Section } from '../../models/clicktrack/Section';
import { EditMetronome } from './EditMetronome';
import { EditRepeat } from './EditRepeat';

interface IEditSection {
  updateSection: <T extends Metronome | Repeat>(
    section: T,
    update: Partial<Omit<T, 'id' | 'type'>>
  ) => void;
  deleteMetronome: (id: string) => void;
  copyMetronome: (id: string) => void;
  selected: Section | undefined;
}

export const EditSection = ({
  updateSection,
  deleteMetronome,
  copyMetronome,
  selected,
}: IEditSection) => {
  if (selected instanceof Metronome)
    return (
      <EditMetronome
        updateMetronome={updateSection}
        deleteMetronome={deleteMetronome}
        copyMetronome={copyMetronome}
        metronome={selected}
      />
    );
  if (selected instanceof Repeat)
    return (
      <EditRepeat
        updateRepeat={updateSection}
        deleteRepeat={deleteMetronome}
        copyRepeat={copyMetronome}
        repeat={selected}
      />
    );
};

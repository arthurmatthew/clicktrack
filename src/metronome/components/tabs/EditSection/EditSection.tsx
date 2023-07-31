import { Metronome, Repeat, Section } from '../../../classes/section';
import { EditMetronome } from './EditMetronome';
import { EditRepeat } from './EditRepeat';

export const EditSection = ({
  updateSection,
  deleteMetronome,
  copyMetronome,
  selected,
}: {
  updateSection: <T extends Metronome | Repeat>(
    section: T,
    update: Partial<Omit<T, 'id' | 'type'>>
  ) => void;
  deleteMetronome: (id: string) => void;
  copyMetronome: (id: string) => void;
  selected: Section | undefined;
}) => {
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

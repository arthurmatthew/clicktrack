import { Repeat } from '../models/Repeat';
import { Clicktrack } from '../models/Clicktrack';
import { ClicktrackData } from '../models/ClicktrackData';
import { Metronome } from '../models/Metronome';
import { validateDeleteSection } from '../utils/validators/validateDeleteSection';
import { DropResult } from 'react-beautiful-dnd';
import { useNotify } from './useNotify';

export const useSection = (
  setClicktrack: (value: React.SetStateAction<Clicktrack>) => void,
  setSelectedId: (value: React.SetStateAction<string>) => void
) => {
  const { notify } = useNotify();

  const addSection = (newSection: Metronome | Repeat): void => {
    setClicktrack(
      (previousClicktrack) =>
        new Clicktrack({
          ...previousClicktrack,
          data: {
            ...previousClicktrack.data,
            sections: [...previousClicktrack.data.sections, newSection],
          },
        })
    );
  };

  const updateSection = <T extends Metronome | Repeat>(
    section: T,
    update: Partial<Omit<T, 'id' | 'type'>>
  ): void => {
    setClicktrack((previousClicktrack) => {
      const indexBefore = previousClicktrack.data.sections.findIndex(
        (thisSection) => thisSection.id === section.id
      );
      const updatedSections = previousClicktrack.data.sections.filter(
        (thisSection) => thisSection.id !== section.id
      );

      if (section instanceof Metronome) {
        updatedSections.splice(
          indexBefore,
          0,
          new Metronome({ ...section, ...update })
        );
      } else if (section instanceof Repeat) {
        updatedSections.splice(
          indexBefore,
          0,
          new Repeat({ ...section, ...update })
        );
      }

      return new Clicktrack({
        ...previousClicktrack,
        data: new ClicktrackData({
          ...previousClicktrack.data,
          sections: updatedSections,
        }),
      });
    });
  };

  const deleteSection = (id: string): void => {
    setClicktrack((previousClicktrack) => {
      if (!validateDeleteSection(previousClicktrack.data.sections, notify))
        return previousClicktrack;

      const updated = new Clicktrack({
        ...previousClicktrack,
        data: new ClicktrackData({
          ...previousClicktrack.data,
          sections: [
            ...previousClicktrack.data.sections.filter(
              (section) => section.id !== id
            ),
          ].map((section) => {
            switch (section.type) {
              case 'metronome':
                return new Metronome(section);
              case 'repeat':
                return new Repeat(section);
            }
          }),
        }),
      });
      const indexOfId = previousClicktrack.data.sections.findIndex(
        (section) => section.id === id
      );
      setSelectedId(() => {
        const closestSection =
          updated.data.sections[indexOfId] ??
          updated.data.sections[indexOfId - 1];
        return closestSection?.id ?? '';
      });
      return updated;
    });
  };

  const copySection = (id: string) => {
    setClicktrack((previousClicktrack) => {
      const sectionToCopy = previousClicktrack.data.sections.find(
        (section) => section.id === id
      );
      if (!sectionToCopy) return previousClicktrack;
      const sectionCopy = () => {
        switch (sectionToCopy.type) {
          case 'metronome':
            return new Metronome({ ...sectionToCopy, id: undefined });
          case 'repeat':
            return new Repeat({ ...sectionToCopy, id: undefined });
        }
      };
      return new Clicktrack({
        ...previousClicktrack,
        data: {
          ...previousClicktrack.data,
          sections: [...previousClicktrack.data.sections, sectionCopy()],
        },
      });
    });
  };

  const sequencerOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    setClicktrack((previousClicktrack) => {
      const result = [...previousClicktrack.data.sections];
      const [removed] = result.splice(source.index, 1);
      if (removed) result.splice(destination.index, 0, removed);
      return new Clicktrack({
        ...previousClicktrack,
        data: {
          ...previousClicktrack.data,
          sections: result,
        },
      });
    });
  };

  return {
    addSection,
    updateSection,
    copySection,
    deleteSection,
    sequencerOnDragEnd,
  };
};

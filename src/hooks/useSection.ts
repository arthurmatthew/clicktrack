import { Clicktrack } from '../models/Clicktrack';
import { ClicktrackData } from '../models/ClicktrackData';
import { validateDeleteSection } from '../utils/validators/validateDeleteSection';
import { DropResult } from 'react-beautiful-dnd';
import { useNotify } from './useNotify';
import { constructSection } from '../utils/constructSection';
import { TSection } from '../types';
import { Transition } from '../models/Transition';
import { Metronome } from '../models/Metronome';

export const useSection = (
  setClicktrack: (value: React.SetStateAction<Clicktrack>) => void,
  setSelectedId: (value: React.SetStateAction<string>) => void
) => {
  const { notify } = useNotify();

  const addSection = (newSection: TSection): void => {
    setClicktrack(
      (previousClicktrack) =>
        new Clicktrack({
          ...previousClicktrack,
          data: {
            ...previousClicktrack.data,
            sections: [
              ...previousClicktrack.data.sections,
              constructSection(newSection),
            ],
          },
        })
    );
  };

  const updateSection = <T extends TSection>(
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

      const updatedSection = constructSection({
        ...section,
        ...update,
      } as Partial<TSection>);

      updatedSections.splice(indexBefore, 0, updatedSection);

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
          ]
            .map((section) => constructSection({ ...section }))
            .filter((section) => section !== undefined),
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
        return constructSection({ ...sectionToCopy, id: undefined });
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

      for (let i = 0; i < result.length; i++) {
        const section = result[i];
        if (section instanceof Transition) {
          const before = result[i - 1];
          const after = result[i + 1];

          section.fromMetronome =
            before instanceof Metronome ? (before as Metronome) : undefined;
          section.toMetronome =
            after instanceof Metronome ? (after as Metronome) : undefined;
        }
      }

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

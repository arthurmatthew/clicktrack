import { Clicktrack } from '../models/Clicktrack';
import { ClicktrackData } from '../models/ClicktrackData';
import { validateDeleteSection } from '../utils/validators/validateDeleteSection';
import { useNotify } from './useNotify';
import { constructSection } from '../utils/constructSection';
import { TSection } from '../types';
import { Transition } from '../models/Transition';
import { Metronome } from '../models/Metronome';
import { generateAccentMap } from '../utils/generateAccentMap';
import { DropResult } from '@hello-pangea/dnd';

export const useSection = (
  setClicktrack: (value: React.SetStateAction<Clicktrack>) => void,
  setSelectedId: (value: React.SetStateAction<string>) => void
) => {
  const { notify } = useNotify();

  const addSection = (newSection: TSection): void => {
    setClicktrack((previousClicktrack) => {
      const previousSections = [...previousClicktrack.data.sections];
      const constructed = constructSection(newSection);
      const updatedSections = [...previousSections, constructed];

      return new Clicktrack({
        ...previousClicktrack,
        data: {
          ...previousClicktrack.data,
          sections: updateTransitions(updatedSections),
        },
      });
    });
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

      let finalUpdate: Partial<T> = { ...update } as Partial<T>;

      // for updating accent map
      if (section instanceof Metronome) {
        const metronomeUpdate = update as Partial<
          Omit<Metronome, 'id' | 'type'>
        >;
        if (metronomeUpdate.timeSignature !== undefined) {
          finalUpdate = {
            ...finalUpdate,
            accentMap: generateAccentMap(
              metronomeUpdate.timeSignature[0],
              metronomeUpdate.timeSignature[1]
            ),
          } as Partial<T>;
        }
      }

      const updatedSection = constructSection({
        ...section,
        ...finalUpdate,
      } as Partial<TSection>);

      updatedSections.splice(indexBefore, 0, updatedSection);

      // HANDLE TRANSITION SECTIONS WHICH CHANGE BASED ON OTHER SECTIONS
      const updatedSectionsAndTransitions = updateTransitions(updatedSections);

      return new Clicktrack({
        ...previousClicktrack,
        data: new ClicktrackData({
          ...previousClicktrack.data,
          sections: updatedSectionsAndTransitions,
        }),
      });
    });
  };

  const updateTransitions = (sections: TSection[]): TSection[] => {
    return sections.map((section, index, array) => {
      if (section instanceof Transition) {
        const before = array[index - 1];
        const after = array[index + 1];
        section.fromMetronome =
          before instanceof Metronome ? before : undefined;
        section.toMetronome = after instanceof Metronome ? after : undefined;
      }
      return section;
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
          sections: updateTransitions(
            [
              ...previousClicktrack.data.sections.filter(
                (section) => section.id !== id
              ),
            ]
              .map((section) => constructSection({ ...section }))
              .filter((section) => section !== undefined)
          ),
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
          sections: updateTransitions([
            ...previousClicktrack.data.sections,
            sectionCopy(),
          ]),
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
          sections: updateTransitions(result),
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

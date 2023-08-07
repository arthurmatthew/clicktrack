import { Repeat } from '../models/clicktrack/Repeat';
import { Clicktrack } from '../models/clicktrack/Clicktrack';
import { ClicktrackData } from '../models/clicktrack/ClicktrackData';
import { Metronome } from '../models/clicktrack/Metronome';

export const useSection = (
  setClicktrack: (value: React.SetStateAction<Clicktrack>) => void,
  setSelectedId: (value: React.SetStateAction<string>) => void
) => {
  const addSection = (newSection: Metronome | Repeat): void => {
    setClicktrack(
      (previousClicktrack) =>
        new Clicktrack({
          ...previousClicktrack,
          data: {
            ...previousClicktrack.data,
            children: [...previousClicktrack.data.children, newSection],
          },
        })
    );
  };

  const updateSection = <T extends Metronome | Repeat>(
    section: T,
    update: Partial<Omit<T, 'id' | 'type'>>
  ): void => {
    setClicktrack((previousClicktrack) => {
      const indexBefore = previousClicktrack.data.children.findIndex(
        (thisSection) => thisSection.id === section.id
      );
      const updatedSections = previousClicktrack.data.children.filter(
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
          children: updatedSections,
        }),
      });
    });
  };

  const deleteSection = (id: string): void => {
    setClicktrack((previousClicktrack) => {
      if (previousClicktrack.data.children.length === 1)
        return previousClicktrack;
      const updated = new Clicktrack({
        ...previousClicktrack,
        data: new ClicktrackData({
          ...previousClicktrack.data,
          children: [
            ...previousClicktrack.data.children.filter(
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
      const indexOfId = previousClicktrack.data.children.findIndex(
        (section) => section.id === id
      );
      setSelectedId(() => {
        const closestSection =
          updated.data.children[indexOfId] ??
          updated.data.children[indexOfId - 1];
        return closestSection?.id ?? '';
      });
      return updated;
    });
  };

  const copySection = (id: string) => {
    setClicktrack((previousClicktrack) => {
      const sectionToCopy = previousClicktrack.data.children.find(
        (section) => section.id === id
      );
      if (!sectionToCopy) return previousClicktrack;
      const sectionCopy = () => {
        switch (sectionToCopy?.type) {
          case 'metronome':
            return new Metronome({ ...sectionToCopy, id: undefined });
          case 'repeat':
            return new Repeat({ ...sectionToCopy, id: undefined });
        }
      };
      return {
        ...previousClicktrack,
        data: {
          ...previousClicktrack.data,
          children: [...previousClicktrack.data.children, sectionCopy()],
        },
      };
    });
  };

  return { addSection, updateSection, copySection, deleteSection };
};

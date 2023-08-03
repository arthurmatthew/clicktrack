import { Clicktrack } from '../../models/clicktrack/Clicktrack';

export const importClicktrack = (
  clicktrackCode: string,
  clicktracksToImportTo: Clicktrack[]
) => {
  try {
    const importedClicktrack = JSON.parse(atob(clicktrackCode)) as Clicktrack;

    return [
      ...clicktracksToImportTo,
      new Clicktrack({
        ...importedClicktrack,
        id: undefined,
        position: clicktracksToImportTo.length + 1,
        name: Clicktrack.generateUniqueName(
          '',
          importedClicktrack.name,
          clicktracksToImportTo
        ),
      }),
    ];
  } catch (error) {
    console.error(error);
    return clicktracksToImportTo;
  }
};

import { TSection } from '../../types';

interface ISectionControls {
  id: string;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
  setSelectedId: (id: string) => void;
  sequence: TSection[];
}

export const SectionControls = ({
  id,
  sequence,
  setSelectedId,
}: ISectionControls) => {
  const sectionIndex = sequence.map((section) => section.id).indexOf(id);
  const total = sequence.length;

  const previousId = sequence[sectionIndex - 1]?.id;
  const nextId = sequence[sectionIndex + 1]?.id;

  return (
    <div className="flex justify-between gap-2 overflow-hidden">
      <button
        onClick={() => {
          if (previousId) setSelectedId(previousId);
        }}
        disabled={previousId === undefined}
        className="flex-1 rounded-sm bg-zinc-300 p-4 py-3 disabled:opacity-50 dark:bg-zinc-900"
      >
        Previous
      </button>
      <div className="flex flex-col items-center">
        <p className="text-sm">Section</p>
        <p className="roboto flex items-center text-2xl">
          <span className="rounded-md bg-zinc-200 px-1 dark:bg-zinc-900">
            {sectionIndex + 1}
          </span>
          <span className="mx-1 text-sm">/</span>
          <span className="rounded-md bg-zinc-200 px-1 dark:bg-zinc-900">
            {total}
          </span>
        </p>
      </div>

      <button
        onClick={() => {
          if (nextId) setSelectedId(nextId);
        }}
        disabled={nextId === undefined}
        className="flex-1 rounded-sm bg-zinc-300 p-4 py-3 disabled:opacity-50 dark:bg-zinc-900"
      >
        Next
      </button>
    </div>
  );
};

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
    <div className="flex flex-col overflow-hidden rounded-sm">
      <p className="col-span-2 text-lg">
        Editing section{' '}
        <span className="roboto">
          <span className="rounded-md bg-zinc-200 px-1 dark:bg-zinc-900">
            {sectionIndex + 1}
          </span>
          /
          <span className="rounded-md bg-zinc-200 px-1 dark:bg-zinc-900">
            {total}
          </span>
        </span>
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            if (previousId) setSelectedId(previousId);
          }}
          disabled={previousId === undefined}
          className="rounded-sm bg-zinc-300 p-4 py-3 duration-100 ease-out disabled:opacity-50 dark:bg-zinc-900"
        >
          Previous Section
        </button>
        <button
          onClick={() => {
            if (nextId) setSelectedId(nextId);
          }}
          disabled={nextId === undefined}
          className="rounded-sm bg-zinc-300 p-4 py-3 duration-100 ease-out disabled:opacity-50 dark:bg-zinc-900"
        >
          Next Section
        </button>
      </div>
    </div>
  );
};

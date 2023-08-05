interface ISectionControls {
  id: string;
  copySection: (id: string) => void;
  deleteSection: (id: string) => void;
}

export const SectionControls = ({
  id,
  copySection,
  deleteSection,
}: ISectionControls) => {
  return (
    <div className="flex flex-col gap-px overflow-hidden rounded-sm">
      <button
        onClick={() => copySection(id)}
        className="w-full bg-neutral-200 p-2 px-4 duration-75 dark:bg-neutral-900"
      >
        Duplicate
      </button>
      <button
        onClick={() => deleteSection(id)}
        className="w-full bg-neutral-200 p-2 px-4 duration-75 hover:bg-red-400 dark:bg-neutral-900 dark:hover:bg-red-900"
      >
        Delete this Section
      </button>
    </div>
  );
};

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
    <div className="flex gap-3 overflow-hidden rounded-sm">
      <button
        onClick={() => {
          copySection(id);
        }}
        className="w-full rounded-sm border-[1px] border-neutral-300 p-4 py-3 dark:border-neutral-900"
      >
        Duplicate this Section
      </button>
      <button
        onClick={() => {
          deleteSection(id);
        }}
        className="w-full rounded-sm border-[1px] border-red-300 p-4 py-3 duration-75 hover:bg-red-300 dark:border-red-700 dark:hover:bg-red-700"
      >
        Delete this Section
      </button>
    </div>
  );
};

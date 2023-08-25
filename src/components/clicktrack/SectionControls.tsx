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
        className="h-full w-1/2 rounded-sm bg-neutral-300 p-4 py-3 duration-100 ease-out dark:bg-neutral-900"
      >
        Duplicate
      </button>
      <button
        onClick={() => {
          deleteSection(id);
        }}
        className="h-full w-1/2 rounded-sm bg-neutral-300 p-4 py-3 duration-100 ease-out hover:bg-red-500 hover:text-white dark:bg-neutral-900 hover:dark:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

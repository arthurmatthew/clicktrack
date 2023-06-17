export const CreateSection = ({ add }: { add: () => void }) => {
  return (
    <div
      onClick={add}
      className="w-full rounded-md border-2 border-dashed border-slate-300 bg-slate-200/50 p-4 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800"
    >
      <div className="flex items-center justify-between text-slate-900 dark:text-slate-100">
        <h1 className="text-3xl font-semibold">
          <i className="bi-plus-square mr-3 text-slate-600 dark:text-slate-400"></i>
          Create New
        </h1>
        <i className="text-2xl text-slate-600 dark:text-slate-400"></i>
      </div>
    </div>
  );
};

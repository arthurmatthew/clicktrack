export const SkeletonLoader = ({ index }: { index: number }) => {
  return (
    <div
      key={index}
      style={{ animationDelay: `${index / 10}s` }}
      className="my-1 w-full animate-pulse select-none rounded-sm border-[1px] border-neutral-200 bg-white p-4 dark:border-neutral-900 dark:bg-black"
    >
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <i className="bi-list cursor-grab text-3xl text-neutral-200 dark:text-neutral-900" />
          <h1 className="flex cursor-default items-center break-all rounded-lg bg-neutral-200 text-3xl focus:outline-0 dark:bg-neutral-900">
            <span className="invisible">alskajdlkjalskdd</span>
          </h1>
          <i className="bi-pencil-fill mx-2 cursor-pointer text-sm opacity-20" />
        </div>
        <div className="my-2 block h-px w-full bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-700 sm:hidden" />
        <div className="flex gap-4">
          <div className="select-none rounded-lg bg-neutral-200 px-10 py-2 dark:bg-neutral-900">
            <p className="invisible">Open</p>
          </div>

          <p className="group flex cursor-pointer items-center gap-2 text-neutral-200 dark:text-neutral-900">
            <span className="rounded-lg bg-neutral-200 dark:bg-neutral-900">
              More
            </span>{' '}
            <i className="bi-caret-right-fill text-sm duration-75" />
          </p>
        </div>
      </div>
    </div>
  );
};

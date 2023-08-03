import { Button } from '../core/Button';

export interface IImport {
  importRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImport: () => void;
}

export const Import = ({ importRef, handleImport }: IImport) => {
  return (
    <div className="my-2 rounded-sm border-[1px] border-neutral-200 p-4 dark:border-neutral-900">
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex w-full grid-cols-3 items-center gap-3">
          <i className="bi-clipboard2 text-3xl text-neutral-600 dark:text-neutral-400" />
          <input
            className="w-full bg-transparent text-2xl placeholder:text-black/50 focus:outline-none dark:placeholder:text-white/50"
            placeholder="Have a code? Paste it here."
            ref={importRef}
          />
        </div>
        <div className="my-2 block h-px w-full bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-700 sm:hidden" />
        <Button onClick={handleImport} className="bg-neutral-500">
          Import
        </Button>
      </div>
    </div>
  );
};

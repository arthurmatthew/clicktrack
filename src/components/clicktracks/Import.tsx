import { Button } from '../core/Button';

export interface IImport {
  importRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImport: () => void;
  showImport: boolean;
  disabled?: boolean;
}

export const Import = ({
  importRef,
  handleImport,
  showImport,
  disabled,
}: IImport) => {
  return (
    <div
      className={`gap-2 overflow-hidden rounded-md bg-neutral-200 p-4 duration-100 dark:bg-neutral-900 sm:grid-cols-2 md:grid-cols-3 ${
        showImport ? 'block' : 'hidden'
      }`}
    >
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex w-full grid-cols-3 items-center gap-3">
          <i className="bi-clipboard2 text-3xl text-neutral-600 dark:text-neutral-400" />
          <input
            className="w-full bg-transparent text-2xl placeholder:text-black/50 focus:outline-none dark:placeholder:text-white/50"
            name="import"
            placeholder="Have a code? Paste it here."
            ref={importRef}
          />
        </div>
        <div className="my-2 block h-px w-full bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-700 sm:hidden" />
        <Button
          disabled={disabled}
          onClick={handleImport}
          className="bg-white dark:bg-black"
        >
          Import
        </Button>
      </div>
    </div>
  );
};

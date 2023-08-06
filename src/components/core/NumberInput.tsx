interface INumberInput {
  value: number;
  set: (value: number) => void;
  increase: () => void;
  decrease: () => void;
  label?: string;
  disabled?: boolean;
}

export const NumberInput = ({
  value,
  set,
  increase,
  decrease,
  label,
  disabled,
}: INumberInput) => {
  const validateAndSet = (value: string) => {
    const parsedValue = parseInt(value);

    if (value === undefined) return;
    if (Number.isNaN(parsedValue)) return;

    set(parsedValue);
  };

  return (
    <div className="flex w-fit flex-col gap-1">
      {label && <h2 className="text-sm opacity-50">{label}</h2>}
      <div
        className={`flex bg-neutral-200 dark:bg-neutral-900 sm:rounded-sm ${
          disabled && 'cursor-not-allowed opacity-50'
        }`}
      >
        <button
          disabled={disabled}
          onClick={increase}
          className="group w-10 disabled:cursor-not-allowed"
        >
          <i className="bi-plus-lg duration-75 group-hover:text-purple-500" />
        </button>
        <div className="flex aspect-square w-10 items-center justify-center overflow-hidden bg-neutral-300 dark:bg-neutral-800">
          <input
            type="text"
            className="roboto w-full bg-transparent text-center text-2xl focus:outline-none"
            value={value}
            onChange={(e) => validateAndSet(e.currentTarget.value)}
          />
        </div>
        <button
          disabled={disabled}
          onClick={decrease}
          className="group w-10 disabled:cursor-not-allowed"
        >
          <i className="bi-dash-lg duration-75 group-hover:text-purple-500" />
        </button>
      </div>
    </div>
  );
};

interface INumberInput {
  value: number;
  increase: () => void;
  decrease: () => void;
  label?: string;
  disabled?: boolean;
}

export const NumberInput = ({
  value,
  increase,
  decrease,
  label,
  disabled,
}: INumberInput) => {
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
          className="w-10 disabled:cursor-not-allowed"
        >
          <i className="bi-plus-lg" />
        </button>
        <div className="flex aspect-square w-10 items-center justify-center overflow-hidden bg-neutral-300 dark:bg-neutral-800">
          <p className="roboto text-2xl">{value}</p>
        </div>
        <button
          disabled={disabled}
          onClick={decrease}
          className="w-10 disabled:cursor-not-allowed"
        >
          <i className="bi-dash-lg" />
        </button>
      </div>
    </div>
  );
};

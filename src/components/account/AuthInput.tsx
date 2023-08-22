interface IAuthInput {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  type: string;
  name: string;
  placeholder?: string;
}

export const AuthInput = ({
  label,
  value,
  onChange,
  type,
  name,
  placeholder,
}: IAuthInput) => {
  return (
    <label htmlFor={name} className="flex flex-col gap-1">
      <p className="opacity-70">{label}</p>
      <input
        className="rounded-sm border-[1px] border-neutral-300 bg-white p-3 text-lg shadow-2xl outline-purple-500 duration-150 focus:shadow-purple-900/50 focus:outline-dashed dark:border-neutral-700 dark:bg-black"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
      />
    </label>
  );
};

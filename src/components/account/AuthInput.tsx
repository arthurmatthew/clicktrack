interface IAuthInput {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  type: 'email' | 'password';
  name: string;
  autocomplete: string;
  placeholder?: string;
}

export const AuthInput = ({
  label,
  value,
  onChange,
  type,
  name,
  placeholder,
  autocomplete,
}: IAuthInput) => {
  return (
    <label htmlFor={name} className="flex flex-col gap-1">
      <div className="flex justify-between">
        <p className="opacity-70">{label}</p>
        {type === 'password' && (
          <p className="underline opacity-70">Forgot Password?</p>
        )}
      </div>
      <input
        className="rounded-sm border-[1px] border-neutral-300 bg-white p-3 text-lg shadow-2xl outline-purple-500 duration-150 focus:shadow-purple-900/50 focus:outline-dashed dark:border-neutral-700 dark:bg-black"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        autoComplete={autocomplete}
      />
    </label>
  );
};

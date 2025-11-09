import { Link } from 'react-router';

interface IAuthInput {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  type: 'email' | 'current-password' | 'new-password';
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
        {type === 'current-password' && (
          <Link to="/app/account/reset" className="underline opacity-70">
            Forgot Password?
          </Link>
        )}
      </div>
      <input
        className="rounded-sm border-[1px] border-zinc-300 bg-white p-3 text-lg shadow-2xl outline-purple-500 duration-150 focus:shadow-purple-900/50 focus:outline-dashed dark:border-zinc-700 dark:bg-black"
        name={name}
        type={
          type === 'current-password' || type === 'new-password'
            ? 'password'
            : type
        }
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        autoComplete={autocomplete}
      />
    </label>
  );
};

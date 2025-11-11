import { IAuthForm } from './IAuthForm';
import { AuthInput } from './AuthInput';

export const ResetForm = ({
  email,
  setEmail,
  loading,
  handleSubmit,
}: IAuthForm) => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center p-2">
      <form className="relative flex flex-col gap-6 rounded-2xl p-8 sm:bg-zinc-200 dark:sm:bg-zinc-900">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <i className="bi-person-raised-hand text-4xl" />
            <h1 className="text-3xl font-semibold">Forgot Password?</h1>
          </div>

          <h2 className="max-w-xs">
            Send a link to your Clicktrack email to change your password.
          </h2>
        </div>
        <div className="h-px w-full bg-black opacity-20 dark:bg-white" />
        <div className="flex flex-col gap-2">
          <AuthInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
            autocomplete="username"
          />
          <button
            onClick={handleSubmit}
            className="rounded-sm border-[1px] border-zinc-300 bg-zinc-100 p-3 text-lg dark:border-zinc-700 dark:bg-zinc-900"
            type="submit"
          >
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </form>
      <a href="/app/account/login" className="mt-10 text-center text-xl">
        <span className="underline">Back to login</span>
      </a>
    </div>
  );
};

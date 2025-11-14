import { IAuthForm } from './IAuthForm';
import { AuthInput } from './AuthInput';
import { AuthProvider } from './AuthProvider';
import { authenticateUserWithGoogle } from '../../lib/firebase/authenticateUserWithGoogle';
import { authenticateUserWithGitHub } from '../../lib/firebase/authenticateUserWithGitHub';

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
}: IAuthForm) => {
  return (
    <div className="flex grow flex-col items-center justify-center p-2">
      <form className="relative flex flex-col gap-6 rounded-2xl p-8 sm:bg-zinc-200 dark:sm:bg-zinc-900">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <i className="bi-door-open-fill text-3xl" />
            <h1 className="text-4xl font-semibold">Sign in</h1>
          </div>

          <h2>Welcome back to Clicktrack!</h2>
        </div>
        <div className="flex flex-col gap-2">
          <AuthProvider
            onClick={() => authenticateUserWithGoogle()}
            name="Google"
          >
            <i className="bi-google" />
          </AuthProvider>
          <AuthProvider
            onClick={() => authenticateUserWithGitHub()}
            name="GitHub"
          >
            <i className="bi-github" />
          </AuthProvider>
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
          <AuthInput
            label="Password"
            name="password"
            type="current-password"
            value={password}
            autocomplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="rounded-sm border border-zinc-300 bg-zinc-100 p-3 text-lg dark:border-zinc-700 dark:bg-zinc-900"
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </div>
      </form>
      <a href="/app/account/register" className="mt-10 text-center text-xl">
        Don't have an account? <span className="underline">Sign up</span>
      </a>
    </div>
  );
};

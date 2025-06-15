import { Link } from 'react-router';
import { IAuthForm } from './IAuthForm';
import { AuthInput } from './AuthInput';
import { authenticateUserWithGitHub } from '../../lib/firebase/authenticateUserWithGitHub';
import { authenticateUserWithGoogle } from '../../lib/firebase/authenticateUserWithGoogle';
import { AuthProvider } from './AuthProvider';

export const RegisterForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
}: IAuthForm) => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <form className="relative flex flex-col gap-6 rounded-2xl p-8 sm:bg-neutral-200 dark:sm:bg-neutral-900">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <i className="bi-door-open-fill text-3xl" />
            <h1 className="text-4xl font-semibold">Register</h1>
          </div>

          <h2>Unlock the potential of Clicktrack</h2>
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
            autocomplete="username"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
          />
          <AuthInput
            label="Password"
            name="password"
            type="new-password"
            autocomplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="rounded-sm border-[1px] border-neutral-300 bg-neutral-100 p-3 text-lg dark:border-neutral-700 dark:bg-neutral-900"
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? 'Hold on...' : 'Register'}
          </button>
        </div>
      </form>
      <Link to="/app/account/login" className="mt-10 text-center text-xl">
        Already have an account? <span className="underline">Log in</span>
      </Link>
    </div>
  );
};

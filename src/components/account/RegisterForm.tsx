import { IAuthForm } from './IAuthForm';
import { AuthInput } from './AuthInput';
import { authenticateUserWithGoogle } from '../../lib/firebase/authenticateUserWithGoogle';
import { AuthProvider } from './AuthProvider';
import { useNotify } from '../../hooks/useNotify';
import { useState } from 'react';

export const RegisterForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
}: IAuthForm) => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, _setGithubLoading] = useState(false);
  const { notify } = useNotify();

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    try {
      await authenticateUserWithGoogle();
    } catch (error: any) {
      if (error.code !== 'auth/popup-closed-by-user') {
        notify('Sign-in failed. Please try again.', 'error');
      }
      setGoogleLoading(false);
    }
  };

  const isAuthLoading = googleLoading || githubLoading || loading;

  return (
    <div className="flex grow flex-col items-center justify-center">
      <form className="relative flex flex-col gap-6 rounded-2xl p-8 sm:bg-zinc-200 dark:sm:bg-zinc-900">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <i className="bi-door-open-fill text-3xl" />
            <h1 className="text-4xl font-semibold">Register</h1>
          </div>

          <h2>Unlock the potential of Clicktrack</h2>
        </div>
        <div className="flex flex-col gap-2">
          <AuthProvider
            onClick={handleGoogleAuth}
            name="Google"
            disabled={isAuthLoading}
          >
            {googleLoading ? (
              <i className="bi-arrow-clockwise animate-spin" />
            ) : (
              <i className="bi-google" />
            )}
          </AuthProvider>
          <AuthProvider name="GitHub" disabled={true}>
            {githubLoading ? (
              <i className="bi-arrow-clockwise animate-spin" />
            ) : (
              <i className="bi-github" />
            )}
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
            className="rounded-sm border border-zinc-300 bg-zinc-100 p-3 text-lg disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? 'Hold on...' : 'Register'}
          </button>
        </div>
      </form>
      <a href="/app/account/login" className="mt-10 text-center text-xl">
        Already have an account? <span className="underline">Log in</span>
      </a>
    </div>
  );
};

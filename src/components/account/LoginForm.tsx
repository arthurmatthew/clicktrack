import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IAuthForm } from './IAuthForm';
import { AuthInput } from './AuthInput';

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
}: IAuthForm) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 100, y: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
      className="flex flex-grow flex-col items-center justify-center"
    >
      <form className="relative flex flex-col gap-6 rounded-md p-16 sm:bg-neutral-200 dark:sm:bg-neutral-900">
        <h1 className="absolute left-0 top-0 hidden p-4 text-2xl font-black tracking-tighter text-purple-500 sm:block">
          ct.
        </h1>
        <h1 className="mb-3 text-center text-4xl font-semibold sm:px-20">
          Sign in to your account
        </h1>
        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="johndoe@gmail.com"
        />
        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="rounded-sm border-[1px] border-neutral-300 bg-neutral-100 p-3 text-lg dark:border-neutral-700 dark:bg-neutral-900"
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      <Link to="/app/account/register" className="mt-10 text-center text-xl">
        Don't have one yet? <span className="underline">Sign up</span>
      </Link>
      <Link to="/app/" className="text-center text-base opacity-75">
        Or, continue without an account
      </Link>
    </motion.div>
  );
};

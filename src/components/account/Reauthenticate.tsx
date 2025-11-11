import { motion } from 'framer-motion';
import { useState } from 'react';
import { reauthenticateUser } from '../../lib/firebase/reauthenticateUser';
import { navigate } from "vike/client/router"

export const Reauthenticate = () => {
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    await reauthenticateUser(password).catch((error) => {
      console.error(error);
      setLoading(false);
    });

    navigate('/app/account');
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 100, y: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
      className="flex grow items-center justify-center"
    >
      <form className="flex flex-col gap-2 rounded-md p-8 sm:bg-zinc-200 dark:sm:bg-zinc-900">
        <h1 className="mb-3 px-5 text-center text-3xl font-semibold">
          Verify it's really you
        </h1>
        <p className="max-w-sm text-center">
          For security reasons, we need you to login again before performing
          this action.
        </p>
        <label htmlFor="email" className="flex flex-col">
          <p className="opacity-70">Password</p>
          <input
            className="rounded-sm border border-zinc-300 bg-white p-3 text-lg focus:bg-zinc-100 focus:outline-none dark:border-zinc-700 dark:bg-black dark:focus:bg-zinc-900"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="rounded-sm border border-zinc-300 bg-zinc-100 p-3 text-lg dark:border-zinc-700 dark:bg-zinc-900"
          type="submit"
          onClick={handleVerify}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </motion.div>
  );
};

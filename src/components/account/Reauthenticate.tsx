import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotify } from '../../hooks/useNotify';
import { useUser } from '../../hooks/useUser';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

export const Reauthenticate = () => {
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const navigate = useNavigate();
  const { notify } = useNotify();

  const handleVerify = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (user === null || user.email === null) return;
    setLoading(true);

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      setLoading(false);
      navigate('/app/account');
    } catch (error) {
      notify(`We couldn't verify you.`, 'error');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 100, y: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
      className="flex flex-grow items-center justify-center"
    >
      <form className="flex flex-col gap-2 rounded-md p-8 sm:bg-neutral-200 dark:sm:bg-neutral-900">
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
            className="rounded-sm border-[1px] border-neutral-300 bg-white p-3 text-lg focus:bg-neutral-100 focus:outline-none dark:border-neutral-700 dark:bg-black dark:focus:bg-neutral-900"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="rounded-sm border-[1px] border-neutral-300 bg-neutral-100 p-3 text-lg dark:border-neutral-700 dark:bg-neutral-900"
          type="submit"
          onClick={handleVerify}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </motion.div>
  );
};

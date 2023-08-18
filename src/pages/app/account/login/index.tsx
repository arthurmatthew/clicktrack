import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../../firebase';
import { useNotify } from '../../../../hooks/useNotify';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const AccountLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { notify } = useNotify();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch(() => {
      notify('There was an issue accessing your account.', 'error');
      return undefined;
    });

    if (userCredential === undefined) return;

    setLoading(false);
    navigate('/app/account/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 100, y: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
      className="flex flex-grow items-center justify-center"
    >
      <form className="flex flex-col gap-2 rounded-md p-8 sm:bg-neutral-900">
        <h1 className="mb-3 px-5 text-center text-3xl font-semibold">
          Sign in to your account
        </h1>
        <label htmlFor="email" className="flex flex-col">
          <p className="opacity-70">Email</p>
          <input
            className="rounded-sm border-[1px] border-neutral-700 bg-black p-3 text-lg focus:bg-neutral-900 focus:outline-none"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="johndoe@gmail.com"
          />
        </label>
        <label htmlFor="email" className="flex flex-col">
          <p className="opacity-70">Password</p>
          <input
            className="rounded-sm border-[1px] border-neutral-700 bg-black p-3 text-lg focus:bg-neutral-900 focus:outline-none"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="rounded-sm border-[1px] border-neutral-700 bg-neutral-900 p-3 text-lg"
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        <Link
          to="/app/account/register"
          className="mt-2 text-center opacity-50"
        >
          Don't have one yet? Sign up
        </Link>
      </form>
    </motion.div>
  );
};

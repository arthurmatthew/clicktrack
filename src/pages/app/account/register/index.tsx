import { createUserWithEmailAndPassword } from 'firebase/auth/cordova';
import { useState } from 'react';
import { auth } from '../../../../firebase';
import { useNotify } from '../../../../hooks/useNotify';
import { Link } from 'react-router-dom';

export const AccountRegister = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { notify } = useNotify();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch(() => {
      notify('There was an issue creating your account.', 'error');
      return undefined;
    });

    if (userCredential === undefined) return;

    const user = userCredential.user;
    console.log(user);
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <form className="flex flex-col gap-2 rounded-md bg-neutral-900 p-8">
        <h1 className="mb-3 px-5 text-center text-3xl font-semibold">
          Make a Clicktrack account
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
          Register
        </button>
        <Link to="/app/account/login" className="mt-2 text-center opacity-50">
          Already have one? Log in
        </Link>
      </form>
    </div>
  );
};

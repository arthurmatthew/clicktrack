import { useEffect, useState } from 'react';
import { AccountTitle } from '../../../components/account/AccountTitle';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';

export const AccountIndex = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/app/account/login');
      }
    });
  }, []);

  return (
    <div className="mx-4 my-10 flex flex-grow flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <AccountTitle name={user?.email} />
      </div>
    </div>
  );
};

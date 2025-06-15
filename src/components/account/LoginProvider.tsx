import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useNotify } from '../../hooks/useNotify';
import { LoginForm } from './LoginForm';
import { authenticateUser } from '../../lib/firebase/authenticateUser';
import { getRedirectResult } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { DB_USERS_COLLECTION_KEY } from '../../config';

export const LoginProvider = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [creatingUser, setCreatingUser] = useState<boolean>(false);

  const navigate = useNavigate();
  const { notify } = useNotify();

  // Check for auth by redirect
  useEffect(() => {
    const checkRedirectAuth = async () => {
      const userCredential = await getRedirectResult(auth);
      if (userCredential && userCredential.user) {
        setCreatingUser(true);
        const userDocRef = doc(
          db,
          DB_USERS_COLLECTION_KEY,
          userCredential.user.uid
        );
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            clicktracks: [],
          });
        }

        navigate('/app/clicktracks');
      }
    };

    checkRedirectAuth();
  }, []);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authenticateUser(email, password);
      setLoading(false);
      navigate('/app/clicktracks/');
    } catch (error) {
      notify(
        'Invalid login attempt. Make sure your password and/or email are correct.',
        'error'
      );
      setLoading(false);
    }
  };

  return (
    <>
      {creatingUser ? (
        <div className="flex h-full flex-grow items-center justify-center">
          <i className="bi-arrow-clockwise block animate-spin text-6xl" />
        </div>
      ) : (
        <LoginForm
          {...{ email, setEmail, password, setPassword, handleSubmit, loading }}
        />
      )}
    </>
  );
};

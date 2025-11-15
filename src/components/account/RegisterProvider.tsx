import { useEffect, useState } from 'react';
import { navigate } from 'vike/client/router';
import { useNotify } from '../../hooks/useNotify';
import { RegisterForm } from './RegisterForm';
import { createUser } from '../../lib/firebase/createUser';
import { getRedirectResult } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  STORAGE_KEYS_GOOGLE_AUTH,
  DB_USERS_COLLECTION_KEY,
} from '../../config';
import { auth, db } from '../../firebase';

export const RegisterProvider = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [redirectLoading, setRedirectLoading] = useState<boolean>(false);
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const { notify } = useNotify();

  useEffect(() => {
    const isGoogleAuthLoading =
      sessionStorage.getItem(STORAGE_KEYS_GOOGLE_AUTH) === 'true';
    if (isGoogleAuthLoading) {
      setRedirectLoading(true);
    }

    const checkRedirectAuth = async () => {
      try {
        const userCredential = await getRedirectResult(auth);
        if (userCredential && userCredential.user) {
          setCreatingUser(true);
          const userDocRef = doc(
            db,
            DB_USERS_COLLECTION_KEY,
            userCredential.user.uid,
          );
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              clicktracks: [],
            });
          }

          navigate('/app/clicktracks');
        }
      } catch (error) {
        notify('Registration failed. Please try again.', 'error');
      } finally {
        sessionStorage.removeItem(STORAGE_KEYS_GOOGLE_AUTH);
        setRedirectLoading(false);
      }
    };

    checkRedirectAuth();
  }, []);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createUser(email, password);
      setLoading(false);
      navigate('/app/clicktracks/');
    } catch (error) {
      notify('Something went wrong.', 'error');
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      {creatingUser || redirectLoading ? (
        <div className="flex h-full grow items-center justify-center">
          <i className="bi-arrow-clockwise block animate-spin text-6xl" />
        </div>
      ) : (
        <RegisterForm
          {...{ email, setEmail, password, setPassword, handleSubmit, loading }}
        />
      )}
    </>
  );
};

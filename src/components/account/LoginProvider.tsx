import { useEffect, useState } from 'react';
import { navigate } from 'vike/client/router';
import { useNotify } from '../../hooks/useNotify';
import { LoginForm } from './LoginForm';
import { authenticateUser } from '../../lib/firebase/authenticateUser';
import { getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  DB_USERS_COLLECTION_KEY,
  STORAGE_KEYS_GOOGLE_AUTH,
} from '../../config';

export const LoginProvider = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
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
        notify('Authentication failed. Please try again.', 'error');
      } finally {
        sessionStorage.removeItem(STORAGE_KEYS_GOOGLE_AUTH);
        setRedirectLoading(false);
      }
    };

    checkRedirectAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && !redirectLoading) {
        // User is signed in (via popup or other means)
        setCreatingUser(true);
        try {
          const userDocRef = doc(db, DB_USERS_COLLECTION_KEY, user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              clicktracks: [],
            });
          }

          navigate('/app/clicktracks');
        } catch (error) {
          notify('Authentication failed. Please try again.', 'error');
          setCreatingUser(false);
        }
      }
    });

    return () => unsubscribe();
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
        'error',
      );
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
        <LoginForm
          {...{ email, setEmail, password, setPassword, handleSubmit, loading }}
        />
      )}
    </>
  );
};

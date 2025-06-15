import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { auth } from '../firebase';

export const useRedirectToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser === null) navigate('/app/account/login');
    });
    return () => unsubscribe();
  }, []);
};

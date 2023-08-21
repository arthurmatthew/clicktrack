import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { useNotify } from '../../hooks/useNotify';
import { RegisterForm } from './RegisterForm';
import { collection, doc, setDoc } from 'firebase/firestore';
import { DB_USERS_COLLECTION_KEY } from '../../config';

export const RegisterProvider = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { notify } = useNotify();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential === undefined) throw new Error('User undefined');

      const usersCollectionRef = collection(db, DB_USERS_COLLECTION_KEY);
      await setDoc(doc(usersCollectionRef, userCredential.user.uid), {
        clicktracks: JSON.stringify([]),
      });

      setLoading(false);
      navigate('/app/account/');
    } catch (error) {
      notify('There was an issue creating your account.', 'error');
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      {...{ email, setEmail, password, setPassword, handleSubmit, loading }}
    />
  );
};

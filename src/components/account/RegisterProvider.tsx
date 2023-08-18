import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useNotify } from '../../hooks/useNotify';
import { RegisterForm } from './RegisterForm';

export const RegisterProvider = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { notify } = useNotify();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch(() => {
      notify('There was an issue creating your account.', 'error');
      return undefined;
    });

    setLoading(false);
    if (userCredential === undefined) return;

    navigate('/app/account/');
  };

  return (
    <RegisterForm
      {...{ email, setEmail, password, setPassword, handleSubmit, loading }}
    />
  );
};

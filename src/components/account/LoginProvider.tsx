import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useNotify } from '../../hooks/useNotify';
import { LoginForm } from './LoginForm';

export const LoginProvider = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { notify } = useNotify();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential === undefined) throw new Error('User undefined');

      setLoading(false);
      navigate('/app/account/');
    } catch (error) {
      notify('There was an issue accessing your account.', 'error');
      setLoading(false);
    }
  };

  return (
    <LoginForm
      {...{ email, setEmail, password, setPassword, handleSubmit, loading }}
    />
  );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotify } from '../../hooks/useNotify';
import { LoginForm } from './LoginForm';
import { authenticateUser } from '../../lib/firebase/authenticateUser';

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
      await authenticateUser(email, password);
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

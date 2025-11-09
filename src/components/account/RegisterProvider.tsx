import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useNotify } from '../../hooks/useNotify';
import { RegisterForm } from './RegisterForm';
import { createUser } from '../../lib/firebase/createUser';

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
      await createUser(email, password);
      setLoading(false);
      navigate('/app/account/');
    } catch (error) {
      notify('Something went wrong.', 'error');
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

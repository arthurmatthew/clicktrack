import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { ResetForm } from './ResetForm';

export const ResetProvider = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    await sendPasswordResetEmail(auth, email);
    setLoading(false);
  };

  return (
    <ResetForm
      {...{ email, setEmail, password, setPassword, loading, handleSubmit }}
    />
  );
};

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AppIndex = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/app/view-metronomes');
  }, []);

  return null;
};

export default AppIndex;

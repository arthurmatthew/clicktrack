import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AppIndex = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('https://ibb.co/YR2fp7M');
  }, []);

  return null;
};

export default AppIndex;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Redirect = ({ to }: { to: string }) => {
  const nav = useNavigate();
  useEffect(() => {
    nav(to);
  }, [nav, to]);
  return null;
};

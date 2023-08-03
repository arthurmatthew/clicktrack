import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IComponent } from './IComponent';

interface IRedirect extends IComponent {
  to: string;
}

export const Redirect = ({ to }: IRedirect) => {
  const nav = useNavigate();
  useEffect(() => {
    nav(to);
  }, [nav, to]);
  return null;
};

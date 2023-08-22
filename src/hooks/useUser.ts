import { useContext } from 'react';
import { UserContext } from '../components/core/UserProvider';

export const useUser = () => {
  const { user, premium } = useContext(UserContext);
  return { user, premium };
};

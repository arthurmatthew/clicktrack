import { useContext } from 'react';
import { UserContext } from '../components/core/UserProvider';

export const useUser = () => {
  const { user, premium, initialized } = useContext(UserContext);
  return { user, premium, initialized };
};

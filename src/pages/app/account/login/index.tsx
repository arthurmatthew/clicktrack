import { LoginProvider } from '../../../../components/account/LoginProvider';
import { usePageTitle } from '../../../../hooks/usePageTitle';

export const AccountLogin = () => {
  usePageTitle('Sign In');

  return <LoginProvider />;
};

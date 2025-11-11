import { LoginProvider } from '../../../../components/account/LoginProvider';
import { usePageTitle } from '../../../../hooks/usePageTitle';

export const Page = () => {
  usePageTitle('Sign In');

  return <LoginProvider />;
};

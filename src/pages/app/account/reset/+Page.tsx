import { ResetProvider } from '../../../../components/account/ResetProvider';
import { usePageTitle } from '../../../../hooks/usePageTitle';

export const Page = () => {
  usePageTitle('Reset Password');

  return <ResetProvider />;
};

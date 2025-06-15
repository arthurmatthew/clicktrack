import { ResetProvider } from '../../../../components/account/ResetProvider';
import { usePageTitle } from '../../../../hooks/usePageTitle';

export const ResetIndex = () => {
  usePageTitle('Reset Password');

  return <ResetProvider />;
};

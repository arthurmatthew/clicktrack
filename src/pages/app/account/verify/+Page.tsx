import { Reauthenticate } from '../../../../components/account/Reauthenticate';
import { usePageTitle } from '../../../../hooks/usePageTitle';

export const Page = () => {
  usePageTitle('Verification');

  return <Reauthenticate />;
};

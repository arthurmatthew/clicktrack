import { Reauthenticate } from '../../../../components/account/Reauthenticate';
import { usePageTitle } from '../../../../hooks/usePageTitle';

export const VerifyIndex = () => {
  usePageTitle('Verification');

  return <Reauthenticate />;
};

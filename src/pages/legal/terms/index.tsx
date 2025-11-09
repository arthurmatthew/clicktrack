import { TermsOfService } from '../../../components/legal/TermsOfService';
import { usePageTitle } from '../../../hooks/usePageTitle';

export const TermsIndex = () => {
  usePageTitle('Terms of Service');

  return <TermsOfService />;
};

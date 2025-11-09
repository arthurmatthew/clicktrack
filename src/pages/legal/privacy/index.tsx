import { PrivacyPolicy } from '../../../components/legal/PrivacyPolicy';
import { usePageTitle } from '../../../hooks/usePageTitle';

export const PrivacyIndex = () => {
  usePageTitle('Privacy Policy');

  return <PrivacyPolicy />;
};

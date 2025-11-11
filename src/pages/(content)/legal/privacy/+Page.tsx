import { PrivacyPolicy } from "../../../../components/legal/PrivacyPolicy";
import { usePageTitle } from "../../../../hooks/usePageTitle";

export const Page = () => {
  usePageTitle('Privacy Policy');

  return <PrivacyPolicy />;
};

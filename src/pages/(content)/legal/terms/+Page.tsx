import { TermsOfService } from "../../../../components/legal/TermsOfService";
import { usePageTitle } from "../../../../hooks/usePageTitle";

export const Page = () => {
  usePageTitle('Terms of Service');

  return <TermsOfService />;
};

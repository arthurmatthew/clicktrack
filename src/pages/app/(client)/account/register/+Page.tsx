import { RegisterProvider } from '../../../../../components/account/RegisterProvider';
import { usePageTitle } from '../../../../../hooks/usePageTitle';

export const Page = () => {
  usePageTitle('Sign Up');

  return <RegisterProvider />;
};

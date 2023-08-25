import { RegisterProvider } from '../../../../components/account/RegisterProvider';
import { usePageTitle } from '../../../../hooks/usePageTitle';

export const AccountRegister = () => {
  usePageTitle('Sign Up');

  return <RegisterProvider />;
};

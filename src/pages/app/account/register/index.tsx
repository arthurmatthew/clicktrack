import { RegisterProvider } from '../../../../components/account/RegisterProvider';
import { usePageTitle } from '../../../../hooks/usePageTitle';

export const RegisterIndex = () => {
  usePageTitle('Sign Up');

  return <RegisterProvider />;
};

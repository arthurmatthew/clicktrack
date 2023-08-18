import { FooterSection } from './FooterSection';

export const FooterLegal = () => {
  return (
    <FooterSection title={'Legal'}>
      <li>
        <a href="/terms" rel="noreferrer" target="_blank">
          Terms of Service
        </a>
      </li>
      <li>
        <a href="/privacy" rel="noreferrer" target="_blank">
          Privacy Policy
        </a>
      </li>
    </FooterSection>
  );
};

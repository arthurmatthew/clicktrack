import { FooterSection } from './FooterSection';

export const FooterContribute = () => {
  return (
    <FooterSection title={'Contribute'}>
      <li>
        <a
          href="https://github.com/arthurmatthew/clicktrack/issues/new?assignees=&labels=bug&projects=&template=%F0%9F%90%9E-bug-report.md&title="
          target="_blank"
        >
          Report a Bug
        </a>
      </li>
      <li>
        <a
          href="https://github.com/arthurmatthew/clicktrack/issues/new?assignees=&labels=enhancement&projects=&template=%F0%9F%92%A1-feature-request.md&title="
          target="_blank"
        >
          Request a Feature
        </a>
      </li>
      <li>
        <a href="https://github.com/arthurmatthew/clicktrack" target="_blank">
          Source Code
        </a>
      </li>
    </FooterSection>
  );
};

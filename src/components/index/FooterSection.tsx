import { IComponent } from '../IComponent';

interface IFooterSection extends IComponent {
  title: string;
}

export const FooterSection = ({ title, children }: IFooterSection) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="font-semibold">{title}</h3>
      <ul className="text-center leading-loose underline">{children}</ul>
    </div>
  );
};

import { IComponent } from '../IComponent';

export const Feature = ({ children }: IComponent) => {
  return (
    <li className="flex gap-2 bg-neutral-900 py-2">
      <i className="bi-check" />
      {children}
    </li>
  );
};

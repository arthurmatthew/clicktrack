import { IComponent } from '../IComponent';

export const Downside = ({ children }: IComponent) => {
  return (
    <li className="flex gap-2 bg-neutral-900 py-2">
      <i className="bi-x" />
      {children}
    </li>
  );
};

import { IComponent } from '../IComponent';

export const Feature = ({ children }: IComponent) => {
  return (
    <li className="flex gap-2 bg-zinc-200 py-2 dark:bg-zinc-900">
      <i className="bi-check" />
      {children}
    </li>
  );
};

import { IComponent } from '../IComponent';

interface IDataViewItem extends IComponent {
  title: string;
}

export const DataViewItem = ({ title, children }: IDataViewItem) => {
  return (
    <li className="px-2">
      {title}{' '}
      <span className="rounded-md bg-neutral-200 px-1 dark:bg-neutral-900">
        {children}
      </span>
    </li>
  );
};
